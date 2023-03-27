import { IsJWT, IsString, MinLength } from "class-validator";

export class AuthMeDto {
    @IsJWT()
    token: string;

}