import { dateFormat } from 'src/utils/dateformat';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  userCode: string;

  @BeforeInsert()
  generateNo() {
    const date = new Date();
    dateFormat(date);
    this.userCode =
      'USER' + dateFormat(date) + uuid4().replace(/-/g, '').substr(0, 5);
  }

  @Column()
  siteNo: string;

  @Column({ nullable: true })
  projectNo: string;

  @Column({ nullable: true })
  userName: string;

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

@Entity()
export class Watches extends BaseEntity {
  @PrimaryColumn()
  watchSN: string;

  @Column()
  userCode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  watchUpdateDate: Date;
}
