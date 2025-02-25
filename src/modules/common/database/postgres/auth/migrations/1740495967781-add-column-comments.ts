import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnComments1740495967781 implements MigrationInterface {
  name = 'AddColumnComments1740495967781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."user_id" IS 'Primary key'`);
    await queryRunner.query(
      `COMMENT ON COLUMN "auth_user"."password" IS 'Authentication Password'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."created_at" IS 'Creation date'`);
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."updated_at" IS 'Last update date'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."updated_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."password" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "auth_user"."user_id" IS NULL`);
  }
}
