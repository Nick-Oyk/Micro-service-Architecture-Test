import {MigrationInterface, QueryRunner} from "typeorm";

export class orderMigration1632497613721 implements MigrationInterface {
    name = 'orderMigration1632497613721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "order_entity_orderstatus_enum" AS ENUM('CREATED', 'CONFIRMED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "itemName" character varying NOT NULL, "unitPrice" numeric(15,6) NOT NULL, "quantity" numeric(15,6) NOT NULL, "totalAmount" numeric(15,6) NOT NULL, "amountPaid" numeric(15,6) NOT NULL DEFAULT '0', "orderStatus" "order_entity_orderstatus_enum" NOT NULL DEFAULT 'CREATED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TYPE "order_entity_orderstatus_enum"`);
    }

}
