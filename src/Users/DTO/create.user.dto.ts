import {
  IsNumber,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Max,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GENDER } from '../enums/user.gender.enum';
import { ROLE } from '../enums/user.role.enum';

export class createUserDTO {
  @IsString()
  @MaxLength(60)
  @MinLength(0)
  Username: string;

  @IsEmail()
  email: string;

  @IsEnum(ROLE, { message: 'INVALID ROLE' })
  Role: ROLE = ROLE.USER;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsString()
  password: string;
}
