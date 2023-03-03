import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { mockCreateTaskDto, mockTask } from './mock';
import { TaskResponseDto } from './dto/response';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

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
        RmqService,
        ConfigService,
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
    describe('if input values is correct', () => {
      it('should create task', async () => {
        const mockTask = mockCreateTaskDto();
        await controller.create(mockTask);

        expect(service.create).toHaveBeenCalledWith(mockTask);
      });
    });
  });
  describe('list()', () => {
    describe('if tasks exists in database', () => {
      it('should return all tasks', async () => {
        const mockListTasks = [new TaskResponseDto(mockTask())];

        jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

        const response = await controller.list();

        expect(service.list).toHaveBeenCalled();
        expect(response).toEqual(mockListTasks);
      });
    });
    describe('if tasks is not exists in database', () => {
      it('should return empty list', async () => {
        const mockListTasks = [];

        jest.spyOn(service, 'list').mockResolvedValueOnce(mockListTasks);

        const response = await controller.list();

        expect(service.list).toHaveBeenCalled();
        expect(response).toEqual(mockListTasks);
      });
    });
  });
  describe('getById()', () => {
    describe('if task exists with id', () => {
      it('should return task', async () => {
        const mockId = mockTask().id;

        jest.spyOn(service, 'getById').mockResolvedValue(mockTask());

        const response = await controller.getById(mockId);

        expect(service.getById).toHaveBeenCalled();
        expect(response.id).toEqual(mockTask().id);
        expect(response.title).toEqual(mockTask().title);
        expect(response.description).toEqual(mockTask().description);
      });
    });
    describe('if task is not exists with id', () => {
      it('should throw error', async () => {
        const mockId = '';

        service.getById = jest
          .fn()
          .mockRejectedValue(
            new NotFoundException([`Task with ${mockId} id's not exists`]),
          );

        await expect(service.getById).rejects.toThrow();
      });
    });
  });
  describe('updateById()', () => {
    describe('if values correct', () => {
      it('should update task by id', async () => {
        const dtoWithNewTitle = {
          title: 'new',
          description: mockCreateTaskDto().description,
        };
        const dtoWithNewDescription = {
          title: mockCreateTaskDto().title,
          description: 'new',
        };

        jest.spyOn(service, 'updateById').mockResolvedValue(undefined);
        jest
          .spyOn(service, 'getById')
          .mockResolvedValue({ ...mockTask(), ...dtoWithNewTitle });

        await controller.updateById(mockTask().id, dtoWithNewTitle);
        const responseWithNewTitle = await controller.getById(mockTask().id);

        jest.spyOn(service, 'updateById').mockResolvedValue(undefined);
        jest
          .spyOn(service, 'getById')
          .mockResolvedValue({ ...mockTask(), ...dtoWithNewDescription });

        await controller.updateById(mockTask().id, dtoWithNewDescription);
        const responseWithNewDescription = await controller.getById(
          mockTask().id,
        );

        expect(responseWithNewTitle.title).toEqual(dtoWithNewTitle.title);
        expect(responseWithNewTitle.description).toEqual(
          dtoWithNewTitle.description,
        );
        expect(responseWithNewDescription.title).toEqual(
          dtoWithNewDescription.title,
        );
        expect(responseWithNewDescription.description).toEqual(
          dtoWithNewDescription.description,
        );
      });
    });
  });
  describe('deleteById()', () => {
    describe('if task exists with id', () => {
      it('should delete task', async () => {
        const mockId = mockTask().id;

        jest.spyOn(service, 'deleteById').mockReturnValue(undefined);

        const response = await controller.deleteById(mockId);

        expect(service.deleteById).toHaveBeenCalled();
        expect(response).toBeUndefined();
      });
    });
  });
});
