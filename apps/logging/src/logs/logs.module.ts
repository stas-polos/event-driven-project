import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { RmqModule } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), RmqModule],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService],
})
export class LogsModule {}
