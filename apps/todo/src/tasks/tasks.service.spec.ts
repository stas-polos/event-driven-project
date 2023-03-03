import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { mockCreateTaskDto, mockTask } from './tasks.mock';
import { TaskResponseDto } from './dto/response';

describe('TasksService', () => {
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

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call TasksService and create task with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const mockTask = mockCreateTaskDto();

      expect(service.create(mockTask)).toBeUndefined();
    });
  });
  describe('list()', () => {
    it('should return list tasks if tasks exists', async () => {
      const mockListTasks = [new TaskResponseDto(mockTask())];

      jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

      expect(service.list()).toEqual(mockListTasks);
    });
    it('should return list tasks if tasks not exists', async () => {
      const mockListTasks = [];

      jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

      expect(service.list()).toEqual(mockListTasks);
    });
  });
});
