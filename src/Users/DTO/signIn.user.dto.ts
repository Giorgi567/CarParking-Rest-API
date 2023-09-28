import { IsEmail, IsString } from 'class-validator';

export class singInDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
