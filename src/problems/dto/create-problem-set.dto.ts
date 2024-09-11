import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemSetDto {

    @ApiProperty({
        description: 'Name of the problem set',
        example: 'set 1',
    })
    name: string;
}
