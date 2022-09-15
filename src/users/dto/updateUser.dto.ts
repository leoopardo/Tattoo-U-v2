import { CreateScheduleDto } from './../../schedules/dto/create-schedule.dto';
import { PostDto } from './../../posts/dto/post.dto';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  profilePicture: any;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  country: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsOptional()
  @IsArray()
  posts: PostDto[];
  @IsOptional()
  @IsArray()
  schedules: CreateScheduleDto[];
}
