import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

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
  @IsArray()
  posts: ObjectId[];
  @IsString()
  @IsNotEmpty()
  password: string;
}
