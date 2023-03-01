import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../task.entity';

export class TaskResponseDto {
  @ApiProperty({ example: '7c9d48ed-0064-4a4c-a66e-0972c0154e4f' })
  readonly id: string;

  @ApiProperty({ example: 'Task' })
  readonly title: string;

  @ApiProperty({ example: 'Description task' })
  readonly description: string;

  @ApiProperty({ example: '2023-01-29 22:07:59.119' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2023-01-29 22:07:59.119' })
  readonly updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
