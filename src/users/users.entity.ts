import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
@Entity()
export class Users extends BaseEntity {
  @PrimaryColumn()
  userCode: string;

  @BeforeInsert()
  generateUserCode() {
    const date = new Date();
    this.userCode = dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  projectId: string;

  @Column('text', { array: true })
  watchSN: string[];

  @Column('text', { nullable: true, array: true })
  beacon: string[];

  @Column({ nullable: true })
  attendDate: string;

  @Column({ nullable: true })
  updateState: boolean;

  @Column({ nullable: true })
  activated: boolean;
}

function dateFormat(date: Date) {
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear().toString().substring(2) + month + day;
}
