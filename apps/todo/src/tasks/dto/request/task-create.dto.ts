import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskCreateDto {
  @ApiProperty({ example: 'Title', type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Description task', type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly description: string;
}
