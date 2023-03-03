import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { RmqModule } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), RmqModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
