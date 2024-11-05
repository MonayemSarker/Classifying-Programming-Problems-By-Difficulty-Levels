import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDifficultyDto {
    @ApiProperty()
    @IsString()
    pairId: string;

    @ApiProperty()
    @IsString()
    difficultProblemId: string;
}
