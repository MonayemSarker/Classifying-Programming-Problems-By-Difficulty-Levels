import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class ValidateSurveyDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}