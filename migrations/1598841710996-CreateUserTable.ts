import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1598841710996 implements MigrationInterface {
    name = 'CreateUserTable1598841710996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "image" character varying, "intro" text NOT NULL DEFAULT 'Welcome to my blog', "email" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
