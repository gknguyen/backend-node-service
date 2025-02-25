import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnComments1740495991982 implements MigrationInterface {
  name = 'AddColumnComments1740495991982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."user_id" IS 'Primary key'`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."email" IS 'User email'`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."phone" IS 'User phone number'`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."created_at" IS 'Creation date'`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."updated_at" IS 'Last update date'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."updated_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."phone" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."email" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user_info"."user_id" IS NULL`);
  }
}
