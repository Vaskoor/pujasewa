import { IsDateString, IsString } from 'class-validator';

export class UpdateAvailabilityDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
