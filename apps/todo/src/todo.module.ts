import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { validationSchema } from './config/validation-schema.config';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/todo/.env',
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    RmqModule,
    DatabaseModule,
    TasksModule,
  ],
  controllers: [],
})
export class TodoModule {}
