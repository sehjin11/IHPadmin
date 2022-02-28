import { dateFormat } from 'src/utils/dateformat';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { AiObject } from '../enum/ai-object.enum';

@Entity()
@Unique(['projectCode'])
export class Project extends BaseEntity {
  @Column()
  @Generated('increment')
  no: number;

  @PrimaryColumn()
  projectNo: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    const no =
      'IHP' + dateFormat(date) + 'D' + uuid4().replace(/-/g, '').substr(0, 5);
    this.projectNo = no.toUpperCase();
  }
  @PrimaryColumn()
  projectCode: string;

  @Column()
  projectName: string;

  @Column()
  organization: string;

  @Column()
  projectPurpose: string;

  @Column()
  appUse: boolean;

  @Column()
  country: string;

  @Column()
  userGroup: string;

  @Column()
  aiObject: AiObject;

  @Column()
  collectedInfo: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  memo: string;

  @Column({ nullable: false, default: false })
  activated: boolean;
}
