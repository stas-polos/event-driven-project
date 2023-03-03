import { TasksService } from './tasks.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskCreateDto, TaskUpdateDto } from './dto/request';
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

  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({
    example: 'b58d68ce-3004-4a9b-adf0-99ec64ca9731',
    name: 'taskId',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':taskId')
  getById(
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ): Promise<TaskResponseDto> {
    return this.tasksService.getById(taskId);
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiParam({
    example: 'b58d68ce-3004-4a9b-adf0-99ec64ca9731',
    name: 'taskId',
    type: 'string',
    required: true,
  })
  @ApiBody({
    type: TaskUpdateDto,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: undefined,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':taskId')
  updateById(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() dto: TaskUpdateDto,
  ): Promise<void> {
    return this.tasksService.updateById(taskId, dto);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiParam({
    example: 'b58d68ce-3004-4a9b-adf0-99ec64ca9731',
    name: 'taskId',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: undefined,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  deleteById(@Param('taskId', ParseUUIDPipe) taskId: string): Promise<void> {
    return this.tasksService.deleteById(taskId);
  }
}
