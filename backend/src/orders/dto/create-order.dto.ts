import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  orderType: string; // 'PACKAGE', 'RENTAL', 'DECORATION'

  @IsNumber()
  totalAmount: number;

  @IsArray()
  items: any[];
}
