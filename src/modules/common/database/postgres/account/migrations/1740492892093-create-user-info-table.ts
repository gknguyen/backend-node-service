import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserInfoTable1740492892093 implements MigrationInterface {
  name = 'CreateUserInfoTable1740492892093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_info" (
        "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying(50) NOT NULL,
        "phone" character varying(20),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_59c55ac40f267d450246040899e" PRIMARY KEY ("user_id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_info"`);
  }
}
