import { Entity, BaseEntity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Watch extends BaseEntity {
  @Column()
  @Generated('increment')
  no: number;

  @PrimaryColumn()
  watchSN: string;

  @Column({ nullable: true })
  userNo: string;

  @Column()
  hardVer: string;

  @Column()
  firmVer: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  watchMemo: string;
}
