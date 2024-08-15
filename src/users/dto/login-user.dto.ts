import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  @IsString()
  password: string;
}