import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Repository } from 'typeorm';
import { LogResponseDto } from './dto/response';
import { LogCreateDto } from './dto/request';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}

  public async list(): Promise<LogResponseDto[]> {
    return this.logRepository
      .find()
      .then((logs: Log[]) => logs.map((log) => new LogResponseDto(log)));
  }

  public async create(dto: LogCreateDto): Promise<void> {
    const { type, log } = dto;
    await this.logRepository.insert({ log: `${type} ${JSON.stringify(log)}` });
  }
}
