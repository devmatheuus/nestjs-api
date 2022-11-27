import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({ description: 'Defines a title.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Defines a content.', nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Defines a owner.', required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;
}
