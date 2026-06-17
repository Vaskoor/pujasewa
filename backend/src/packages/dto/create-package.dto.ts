import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsArray()
  includesItems: any[];
}
