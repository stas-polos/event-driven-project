import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLogsEntity1677802066339 implements MigrationInterface {
  name = 'createLogsEntity1677802066339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`logs\` 
     (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`log\` text NOT NULL, 
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
        \`deleted_at\` timestamp NULL, 
        INDEX \`ix_logs_updated_at\` (\`updated_at\`), 
        INDEX \`ix_logs_deleted_at\` (\`deleted_at\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`ix_logs_deleted_at\` ON \`logs\``);
    await queryRunner.query(`DROP INDEX \`ix_logs_updated_at\` ON \`logs\``);
    await queryRunner.query(`DROP TABLE \`logs\``);
  }
}
