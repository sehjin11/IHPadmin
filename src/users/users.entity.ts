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
export class Users extends BaseEntity {
  @PrimaryColumn()
  userCode: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  projectCode: string;

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
