import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class FilterSurveyDto {
    @ApiPropertyOptional({
        description: 'Partial or full name of the survey to filter by',
        example: 'Algorithms'
    })
    @IsString()
    @IsOptional()
    name?: string;
}