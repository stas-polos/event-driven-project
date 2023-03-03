import { NestFactory } from '@nestjs/core';
import { LoggingModule } from './logging.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqOptions } from '@nestjs/microservices';
import { LOGS_CONSUMER } from './logging.constants';

async function bootstrap() {
  const app = await NestFactory.create(LoggingModule);

  const configService = app.get<ConfigService>(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('App Logging')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('logging/api/docs', app, document);

  await app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(LOGS_CONSUMER, false),
  );
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
