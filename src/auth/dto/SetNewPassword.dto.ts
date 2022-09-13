import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SetNewPasswordDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
