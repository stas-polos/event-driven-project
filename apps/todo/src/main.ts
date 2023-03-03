import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { TODO_CONSUMER } from './todo.constants';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);

  const configService = app.get<ConfigService>(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('App ToDo')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('todo/api/docs', app, document);

  await app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(TODO_CONSUMER, false),
  );
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
