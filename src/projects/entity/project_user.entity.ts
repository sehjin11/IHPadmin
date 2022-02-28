import { dateFormat } from 'src/utils/dateformat';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  getManager,
} from 'typeorm';

@Entity()
export class Project_user extends BaseEntity {
  @PrimaryColumn()
  userNo: string;

  @BeforeInsert()
  async generateNo() {
    const userCount = await getManager().query(
      `select trim(to_char(count("userNo")+1, '099999')) as userCount from project_user`,
    );
    const no = 'USER' + userCount[0]['usercount'];
    this.userNo = no.toUpperCase();
  }

  @Column()
  siteNo: string;

  @Column()
  projectNo: string;

  @Column()
  userName: string;

  @Column()
  userGender: string;

  @Column()
  userBirth: string;

  @Column()
  userContact: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  userAttendDate: string;

  @Column({ type: 'date' })
  userEndDate: string;

  @Column()
  activated: boolean;

  @Column()
  userMemo: string;
}
