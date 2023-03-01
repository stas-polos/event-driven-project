import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { validationSchema } from './config/validation-schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    DatabaseModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
