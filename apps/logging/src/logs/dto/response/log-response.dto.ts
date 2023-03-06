import { ApiProperty } from '@nestjs/swagger';
import { Log } from '../../log.entity';

export class LogResponseDto {
  @ApiProperty({ example: '1' })
  readonly id: number;

  @ApiProperty({ example: 'Created task' })
  readonly log: string;

  @ApiProperty({ example: '2023-01-29 22:07:59.119' })
  readonly createdAt: Date;

  constructor(log: Log) {
    this.id = log.id;
    this.log = log.log;
    this.createdAt = log.createdAt;
  }
}
