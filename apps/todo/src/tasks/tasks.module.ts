import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { RmqModule } from '@app/common';
import { LOGS_CONSUMER } from '../todo.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    RmqModule.register({
      name: LOGS_CONSUMER,
      noAck: false,
      persistent: true,
      prefetchCount: 1,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
