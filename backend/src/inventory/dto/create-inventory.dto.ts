import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  stockQuantity: number;

  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsString()
  supplier?: string;
}
