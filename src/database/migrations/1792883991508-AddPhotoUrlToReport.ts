import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhotoUrlToReport1792883991508 implements MigrationInterface {
  name = 'AddPhotoUrlToReport1792883991508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'WATER_REPORT',
      new TableColumn({
        name: 'photoUrl',
        type: 'varchar',
        isNullable: false,
        default: "''",
      }),
    );

    await queryRunner.addColumn(
      'WATER_REPORT',
      new TableColumn({
        name: 'repairPhotoUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('WATER_REPORT', 'repairPhotoUrl');
    await queryRunner.dropColumn('WATER_REPORT', 'photoUrl');
  }
}