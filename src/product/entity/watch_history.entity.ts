import {
  Entity,
  BaseEntity,
  Column,
  Generated,
  PrimaryColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Watch_history extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column()
  watchSN: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @Column({ nullable: true })
  memo: string;
}
