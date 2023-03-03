import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation-schema.config';
import { DatabaseModule } from './database/database.module';
import { LogsModule } from './logs/logs.module';
import { RmqModule } from '@app/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/logging/.env',
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    RmqModule,
    DatabaseModule,
    LogsModule,
  ],
})
export class LoggingModule {}
