import { IsString, IsArray, IsInt, IsOptional, Min } from 'class-validator';

export class CreatePanditProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experienceYears?: number;

  @IsArray()
  @IsString({ each: true })
  specializationIds: string[];
}
