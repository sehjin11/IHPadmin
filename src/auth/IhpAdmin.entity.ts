import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IhpAdmin extends BaseEntity {
  @PrimaryGeneratedColumn()
  ihpAdminNo: number;

  @Column()
  ihpAdminId: string;

  @Column()
  password: string;

  @Column()
  adminType: string;
}
