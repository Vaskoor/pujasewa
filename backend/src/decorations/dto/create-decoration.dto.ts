import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateDecorationDto {
  @IsString()
  name: string;

  @IsString() @IsOptional()
  description?: string;

  @IsInt() @Min(0)
  price: number;

  @IsString()
  type: string;  // required now

  @IsString() @IsOptional()
  emoji?: string;

  @IsString() @IsOptional()
  imageUrl?: string;
}
