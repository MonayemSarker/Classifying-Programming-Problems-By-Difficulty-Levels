import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
    @ApiProperty({
        description: 'The email address of the participant',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The name of the participant',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The designation or title of the participant',
        example: 'Teacher',
    })
    @IsString()
    designation: string;

    @ApiProperty({
        description: 'The current location of the participant',
        example: 'USA',
    })
    @IsString()
    location: string;

    @ApiProperty({
        description: 'The institution the participant is affiliated with',
        example: 'Harvard University',
    })
    @IsString()
    institution: string;
}
