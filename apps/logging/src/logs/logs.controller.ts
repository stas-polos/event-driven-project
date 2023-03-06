import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { LogResponseDto } from './dto/response';
import { LogsService } from './logs.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventPatterns } from './enums';
import { RmqService } from '@app/common';
import { LogCreateDto } from './dto/request';

@ApiTags('logs')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('logs')
export class LogsController {
  private readonly logger = new Logger(LogsController.name);
  constructor(
    private readonly logsService: LogsService,
    private readonly rmqService: RmqService,
  ) {}
  @ApiOperation({ summary: 'Get list logs' })
  @ApiResponse({
    type: LogResponseDto,
    status: HttpStatus.OK,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  list(): Promise<LogResponseDto[]> {
    return this.logsService.list();
  }

  @EventPattern(EventPatterns.CREATE_LOG)
  create(@Payload() data: LogCreateDto, @Ctx() context: RmqContext) {
    this.logger.debug(data);
    this.logsService.create(data);
    this.rmqService.ack(context);
  }
}
