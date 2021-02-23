
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, MaxLength, MinLength} from 'class-validator';
import {Role,Gender} from '@prisma/client';
  


export class CreateUserDto {

    @IsNotEmpty()
    @MaxLength(60)
    name: string;

   
    @IsNotEmpty()
    @MaxLength(60)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @MinLength(8)
    @MaxLength(25)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
      each: true,
      message: `must be a valid gender value`,
    })
    gender: Gender;

    @IsNotEmpty()
    @IsEnum(Role, {
      each: true,
      message: `must be a valid role value`,
    })
    role: Role

    @IsNumber()
    @IsNotEmpty()
    companyId: number
}