import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: 'b58d68ce-3004-4a9b-adf0-99ec64ca9731' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Title' })
  @Column({
    type: 'varchar',
    length: 256,
    unique: false,
    nullable: false,
  })
  title: string;

  @ApiProperty({ example: 'Description' })
  @Column({ type: 'text', unique: false })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Index('ix_tasks_updated_at')
  @UpdateDateColumn({
    name: 'updated_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Index('ix_tasks_deleted_at')
  @DeleteDateColumn({
    name: 'deleted_at',
    precision: null,
    type: 'timestamp',
    default: null,
  })
  deletedAt?: Date;
}
