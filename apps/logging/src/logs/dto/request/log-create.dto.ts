import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class LogCreateDto {
  @ApiProperty({ type: 'string', example: 'created' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ type: 'object' })
  @IsObject()
  @IsNotEmpty()
  readonly log: object;
}
