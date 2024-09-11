import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto  {
    @ApiPropertyOptional({ example: 'strongPassword123', description: 'Password of the user' })
    @IsString()
    password: string;
  
    @ApiPropertyOptional({ example: 'username123', description: 'Username of the user' })
    @IsString()
    username: string;
  
    @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the user' })
    @IsString()
    name: string;
}
