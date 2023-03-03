import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskCreateDto, TaskUpdateDto } from './dto/request';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskResponseDto } from './dto/response';
import { LOGS_CONSUMER } from '../todo.constants';
import { ClientProxy } from '@nestjs/microservices';
import { TaskCreated, TaskUpdated } from './events';
import { lastValueFrom } from 'rxjs';
import { EventPatterns, EventTypes } from './enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @Inject(LOGS_CONSUMER) private readonly clientProxy: ClientProxy,
  ) {}
  public async create(dto: TaskCreateDto): Promise<void> {
    const task = await this.taskRepository.save(dto);

    await lastValueFrom(
      this.clientProxy.emit(EventPatterns.CREATE_LOG, {
        type: EventTypes.TASK_CREATED,
        log: new TaskCreated(task.id, task.title, task.description),
      }),
    );
  }

  public async list(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.find();
    return tasks.map((task: Task) => new TaskResponseDto(task));
  }

  public async getById(id: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({ id });

    if (!task) {
      throw new NotFoundException([`Task with ${id} id's not exists`]);
    }

    return new TaskResponseDto(task);
  }

  public async updateById(id: string, dto: TaskUpdateDto): Promise<void> {
    await this.getById(id);
    const task = await this.taskRepository.save({ id, ...dto });

    await lastValueFrom(
      this.clientProxy.emit(EventPatterns.CREATE_LOG, {
        type: EventTypes.TASK_UPDATED,
        log: new TaskUpdated(id, task.title, task.description),
      }),
    );
  }

  public async deleteById(id: string): Promise<void> {
    const task = await this.getById(id);
    await this.taskRepository.delete({ id });

    await lastValueFrom(
      this.clientProxy.emit(EventPatterns.CREATE_LOG, {
        type: EventTypes.TASK_DELETED,
        log: new TaskUpdated(task.id, task.title, task.description),
      }),
    );
  }
}
