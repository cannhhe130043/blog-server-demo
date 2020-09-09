import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyEmailToNullable1599473827607 implements MigrationInterface {
    name = 'ModifyEmailToNullable1599473827607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP DEFAULT`);
    }

}
