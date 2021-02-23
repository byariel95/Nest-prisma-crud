import { IsOptional, IsString } from "class-validator";

export class FindUserByName {
    
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

}