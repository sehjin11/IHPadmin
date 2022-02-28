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
export class Project_site extends BaseEntity {
  @Column()
  @Generated('increment')
  no: number;

  @PrimaryColumn()
  siteNo: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    const no =
      'SITE' + dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);

    this.siteNo = no.toUpperCase();
  }

  @Column()
  projectNo: string;

  @Column()
  siteName: string;

  @Column()
  siteAddress: string;

  @Column()
  siteContact: string;

  @Column()
  siteMemo: string;
}
