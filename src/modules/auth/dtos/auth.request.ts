import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  password: string;
}