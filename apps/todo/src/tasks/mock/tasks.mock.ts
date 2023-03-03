import { Task } from '../task.entity';
import { TaskCreateDto } from '../dto/request';

export const mockCreateTaskDto = (): TaskCreateDto => ({
  title: 'anyTitle',
  description: 'anyDescription',
});

export const mockTask = (): Task => ({
  id: 'anyId',
  title: 'anyTitle',
  description: 'anyDescription',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});
