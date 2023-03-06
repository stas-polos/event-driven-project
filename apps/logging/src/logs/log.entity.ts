import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  log: string;

  @CreateDateColumn({
    name: 'created_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Index('ix_logs_updated_at')
  @UpdateDateColumn({
    name: 'updated_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Index('ix_logs_deleted_at')
  @DeleteDateColumn({
    name: 'deleted_at',
    precision: null,
    type: 'timestamp',
    default: null,
  })
  deletedAt?: Date;
}
