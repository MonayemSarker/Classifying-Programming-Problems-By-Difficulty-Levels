import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailDto {
    @ApiProperty({ example: 'recipient@example.com', description: 'Email recipient' })
    @IsEmail()
    @IsNotEmpty()
    to: string;

    @ApiProperty({ example: 'XjsadSW', description: 'SurveyCode' })
    @IsString()
    @IsNotEmpty()
    surveyCode: string;
}
