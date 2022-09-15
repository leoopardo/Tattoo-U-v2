import { IsDate, IsString } from 'class-validator';
export class CreateScheduleDto {
  owner: string;
  @IsString()
  art: string;
  @IsString()
  client: string;
  @IsDate()
  date: string;
  @IsString()
  price: string;
}
