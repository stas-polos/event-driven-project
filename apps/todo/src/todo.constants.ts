import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const TODO_CONSUMER = 'todo_consumer'; // configService.get('RABBIT_MQ_TODO_CONSUMER');
export const LOGS_CONSUMER = 'logs_consumer'; // configService.get('RABBIT_MQ_LOGS_CONSUMER');
