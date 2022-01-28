import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity()
@Unique(['projectCode'])
export class Projects extends BaseEntity {
  @PrimaryColumn()
  projectId: string;

  @BeforeInsert()
  generateUuid() {
    const date = new Date();
    this.projectId = dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }
  @PrimaryColumn()
  projectCode: string;

  @Column()
  projectName: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column()
  projectPurpose: string;

  @Column()
  projectSite: string;

  @Column()
  manager: string;

  @Column()
  activated: boolean;
}

function dateFormat(date: Date) {
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear().toString().substring(2) + month + day;
}
