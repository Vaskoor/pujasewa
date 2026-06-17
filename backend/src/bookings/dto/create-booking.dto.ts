import {
  IsString, IsOptional, IsDateString, IsUUID,
  IsInt, Min, IsBoolean, IsPhoneNumber, IsEmail,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  eventType: string;

  @IsString()
  district: string;

  @IsString()
  address: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsInt() @Min(30)
  @IsOptional()
  duration?: number; // minutes

  @IsString() @IsOptional()
  caste?: string;

  @IsString() @IsOptional()
  religion?: string;

  // Personal details
  @IsString()
  customerName: string;

  @IsString()
  phone: string; // NEVER forwarded to pandit

  @IsString() @IsOptional()
  altPhone?: string;

  @IsEmail() @IsOptional()
  email?: string;

  @IsString() @IsOptional()
  notes?: string;

  // Optional pandit preference
  @IsUUID() @IsOptional()
  panditId?: string;

  // Add-ons
  @IsUUID() @IsOptional()
  packageId?: string;

  @IsUUID() @IsOptional()
  decorationId?: string;
}
