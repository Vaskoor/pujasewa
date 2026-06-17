import { Module } from '@nestjs/common';
import { CustomPujaController } from './custom-puja.controller';

@Module({
  controllers: [CustomPujaController],
})
export class CustomPujaModule {}
