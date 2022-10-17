import { ObjectId } from 'mongoose';
import { PostDto } from '../../posts/dto/post.dto';
import { CreateScheduleDto } from '../../schedules/dto/create-schedule.dto';
import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
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
  role: string;
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
  @IsString()
  @IsNotEmpty()
  password: string;
}
