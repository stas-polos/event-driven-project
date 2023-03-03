import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { mockCreateTaskDto, mockTask, clientProxyFactoryMock } from './mock';
import { TaskResponseDto } from './dto/response';
import { LOGS_CONSUMER } from '../todo.constants';

describe('TasksService', () => {
  let tasksService: TasksService;
  let find: jest.Mock;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    findOne = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: LOGS_CONSUMER,
          useFactory: clientProxyFactoryMock,
        },
        {
          provide: getRepositoryToken(Task),
          useValue: { find, findOne, save },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('create()', () => {
    describe('if input data is valid', () => {
      beforeEach(() => {
        save.mockReturnValue(Promise.resolve(mockCreateTaskDto()));
      });
      it('should create new task and return undefined', async () => {
        const mockTask = mockCreateTaskDto();
        const response = await tasksService.create(mockTask);
        expect(response).toBeUndefined();
      });
    });
  });
  describe('list()', () => {
    describe('if tasks exists in database', () => {
      beforeEach(() => {
        find.mockReturnValue([mockTask()]);
      });
      it('should return list tasks', async () => {
        const mockListTasks = [new TaskResponseDto(mockTask())];
        const tasks = await tasksService.list();
        expect(tasks.length).toEqual(1);
        expect(tasks).toEqual(mockListTasks);
      });
    });
    describe('if tasks is not exists in database', () => {
      beforeEach(() => {
        find.mockReturnValue([]);
      });
      it('should return empty list', async () => {
        const mockListTasks = [];
        const tasks = await tasksService.list();
        expect(tasks.length).toEqual(0);
        expect(tasks).toEqual(mockListTasks);
      });
    });
  });
});
