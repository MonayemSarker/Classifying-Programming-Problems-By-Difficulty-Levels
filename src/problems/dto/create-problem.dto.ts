import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateProblemDto {
    @ApiPropertyOptional({
        type: String,
        description: 'ID of the problem set'
    })
    @IsOptional()
    @IsString()
    problemSet_id?: string;

    @ApiProperty({
        description: 'Description of the problem',
        example: 'Calculate the sum of two numbers.',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Code snippet or problem statement',
        example: 'def sum(a, b): return a + b',
    })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({
        description: 'Initial score for the problem',
        example: 2,
    })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(3)
    initial_score: number;
}
