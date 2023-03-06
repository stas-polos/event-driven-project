import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/tasks/task.entity';
import { LOGS_CONSUMER } from '../src/todo.constants';
import { clientProxyFactoryMock } from '../src/tasks/mock';

jest.mock('rxjs', () => {
  const original = jest.requireActual('rxjs');

  return {
    ...original,
    lastValueFrom: () =>
      new Promise((resolve, reject) => {
        resolve(true);
      }),
  };
});

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let find: jest.Mock;
  let insert: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    insert = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: [find, insert],
        },
        {
          provide: LOGS_CONSUMER,
          useFactory: clientProxyFactoryMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  describe('/api/tasks (POST)', () => {
    describe('if input values is correct', () => {
      it('should create new task and return status 201', async () => {
        const validDto = { title: 'title', description: 'description' };
        return request(app.getHttpServer())
          .post('/api/tasks')
          .send(validDto)
          .expect(HttpStatus.CREATED);
      });
    });
    describe('if input values is not correct', () => {
      it('should throw validation error', async () => {
        const noValidDto = { title: 1, description: 2 };
        return request(app.getHttpServer())
          .post('/api/tasks')
          .send(noValidDto)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
