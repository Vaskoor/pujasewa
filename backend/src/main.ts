import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './common/logger/logger.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  
  const customLogger = app.get(CustomLogger);
  app.useLogger(customLogger);
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  const configService = app.get(ConfigService);
  
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: true,
  }));
  app.use(compression());
  app.use(cookieParser());
  
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter(customLogger));
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor());
  
  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PujaSewa Nepal API')
    .setDescription('Complete Pandit Booking Platform')
    .setVersion('2.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  
  // Optional: serve static files for favicon/icons (suppresses 404 logs)
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/' });
  
  app.enableShutdownHooks();
  
  const port = configService.get('PORT', 3000);
  await app.listen(port, '0.0.0.0');
  customLogger.log(`Application running on port ${port}`);

  // Global unhandled rejection handler
  process.on('unhandledRejection', (reason, promise) => {
    customLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  process.on('uncaughtException', (error) => {
    customLogger.error(`Uncaught Exception: ${error.message}`, error.stack);
    process.exit(1);
  });
}
bootstrap();
