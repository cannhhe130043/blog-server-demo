import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePostTable1598841765046 implements MigrationInterface {
    name = 'CreatePostTable1598841765046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "isPrivate" boolean NOT NULL DEFAULT false, "image" character varying, "createdTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
