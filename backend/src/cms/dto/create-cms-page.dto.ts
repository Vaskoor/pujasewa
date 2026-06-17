import { IsString, IsOptional } from 'class-validator';

export class CreateCmsPageDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  seoMeta?: any;
}
