import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTasksEntity1677667346386 implements MigrationInterface {
  name = 'createTasksEntity1677667346386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" 
            (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "title" character varying(256) NOT NULL, 
                "description" text NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "deleted_at" TIMESTAMP, 
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
          `,
    );
    await queryRunner.query(
      `CREATE INDEX "ix_tasks_updated_at" ON "tasks" ("updated_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "ix_tasks_deleted_at" ON "tasks" ("deleted_at") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."ix_tasks_deleted_at"`);
    await queryRunner.query(`DROP INDEX "public"."ix_tasks_updated_at"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
