import { TasksService } from './tasks.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskCreateDto } from './dto/request';
import { TaskResponseDto } from './dto/response';

@ApiTags('tasks')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create task' })
  @ApiBody({
    required: true,
    type: TaskCreateDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: null,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: TaskCreateDto): Promise<void> {
    return this.tasksService.create(dto);
  }

  @ApiOperation({ summary: 'Get list tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskResponseDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  list(): Promise<TaskResponseDto[]> {
    return this.tasksService.list();
  }
}
