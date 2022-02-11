import { dateFormat } from 'src/utils/dateformat';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { AiObject } from './enum/ai-object.enum';

@Entity()
@Unique(['projectCode'])
export class Project extends BaseEntity {
  @PrimaryColumn()
  projectNo: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    this.projectNo =
      'IHP' + dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }
  @PrimaryColumn()
  projectCode: string;

  @Column()
  projectName: string;

  @Column()
  projectPurpose: string;

  @Column()
  appUse: boolean;

  @Column()
  aiObject: AiObject;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: false, default: false })
  activated: boolean;
}

@Entity()
export class Project_site extends BaseEntity {
  @PrimaryColumn()
  siteNo: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    this.siteNo =
      'SITE' + dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }

  @Column()
  projectNo: string;

  @Column()
  siteName: string;

  @Column()
  siteAdress: string;

  @Column()
  siteContact: string;
}
