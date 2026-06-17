import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  PANDIT = 'PANDIT',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
