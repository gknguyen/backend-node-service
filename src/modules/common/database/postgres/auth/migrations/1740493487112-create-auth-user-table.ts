import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthUserTable1740493487112 implements MigrationInterface {
  name = 'CreateAuthUserTable1740493487112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_user" (
        "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "password" character varying(100),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_56a085125d8c8fc776e73a32b26" PRIMARY KEY ("user_id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth_user"`);
  }
}
