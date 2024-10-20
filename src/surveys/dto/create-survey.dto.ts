import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateSurveyDto {
    @ApiProperty({
        description: 'Name of the survey',
        example: 'Difficulty Survey for Algorithms'
    })
    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'Array of ObjectIds for the problem sets',
        example: ['605c72f1bcf86cd799439011', '605c72f1bcf86cd799439012']
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    problemSet_ids: string[];
}
