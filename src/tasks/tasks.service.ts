import { Injectable } from '@nestjs/common';
import { TaskCreateDto } from './dto/request';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskResponseDto } from './dto/response';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}
  public async create(dto: TaskCreateDto): Promise<void> {
    await this.taskRepository.insert(dto);
  }

  public async list(): Promise<TaskResponseDto[]> {
    return await this.taskRepository
      .find()
      .then((tasks: Task[]) =>
        tasks.map((task: Task) => new TaskResponseDto(task)),
      );
  }
}
