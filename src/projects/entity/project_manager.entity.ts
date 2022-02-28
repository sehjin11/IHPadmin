import { dateFormat } from 'src/utils/dateformat';
import {
  Entity,
  BaseEntity,
  Column,
  Generated,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
export class Project_manager extends BaseEntity {
  @Column()
  @Generated('increment')
  no: number;

  @PrimaryColumn()
  managerNo: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    const no =
      'MNG' + dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);

    this.managerNo = no.toUpperCase();
  }

  @Column()
  siteNo: string;

  @Column()
  projectNo: string;

  @Column()
  monitorSites: string;

  @Column()
  managerNick: string;

  @Column()
  managerEmail: string;

  @Column()
  managerContact: string;

  @Column()
  managerId: string;

  @Column()
  password: string;

  @Column()
  managerMemo: string;
}
