import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const TODO_CONSUMER = configService.get('RABBIT_MQ_TODO_CONSUMER');
export const LOGS_CONSUMER = configService.get('RABBIT_MQ_LOGS_CONSUMER');
