import { Entity, BaseEntity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Ble extends BaseEntity {
  @Column()
  @Generated('increment')
  no: number;

  @PrimaryColumn()
  bleSN: string;

  @Column()
  userNo: string;

  @Column()
  hardVer: string;

  @Column()
  firmVer: string;

  @Column()
  status: string;

  @Column()
  watchMemo: string;
}
