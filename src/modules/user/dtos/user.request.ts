import { ApiProperty } from '@nestjs/swagger';
import { userAccessLevel, userStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 14)
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(userStatus)
  status?: userStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(userAccessLevel)
  accessLevel: userAccessLevel;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  companyId: string;
}