import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCompanyDto {

    
    @IsNotEmpty()
    @MaxLength(60)
    name: string;

   
    @IsNotEmpty()
    @MaxLength(60)
    address: string;

   
    @MaxLength(70)
    description: string;

   
    
}