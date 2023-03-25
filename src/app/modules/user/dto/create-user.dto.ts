import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minSymbols: 1,
    })
    password: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

}