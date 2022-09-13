import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestNewPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
