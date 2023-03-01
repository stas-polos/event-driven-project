import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { mockCreateTaskDto, mockTask } from './tasks.mock';
import { TaskResponseDto } from './dto/response';

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

  describe('create()', () => {
    it('should call TasksService and create task with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const mockTask = mockCreateTaskDto();

      await controller.create(mockTask);

      expect(service.create).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('list()', () => {
    it('show call Tasks TasksService and return all tasks if tasks exists', async () => {
      const mockListTasks = [new TaskResponseDto(mockTask())];

      jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

      const response = await controller.list();

      expect(service.list).toHaveBeenCalled();
      expect(response).toEqual(mockListTasks);
    });
    it('show call Tasks TasksService and return all tasks if tasks not exists', async () => {
      const mockListTasks = [];

      jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

      const response = await controller.list();

      expect(service.list).toHaveBeenCalled();
      expect(response).toEqual(mockListTasks);
    });
  });
});
