import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskCreateDto } from './dto/request';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

jest.mock('./tasks.service');

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let find: jest.Mock;
  let insert: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    insert = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: [find, insert],
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('TasksService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create task', () => {
    const task = {
      title: 'Title',
      description: 'Description',
    } as TaskCreateDto;

    expect(controller.create(task)).toBeUndefined();
    expect(service.create).toHaveBeenCalled();
  });
});
