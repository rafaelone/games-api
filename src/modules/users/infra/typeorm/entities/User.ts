import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  account_name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  last_login_web: Date;

  @Column()
  status: boolean;

  @Column()
  street: string;

  @Column()
  house_number: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  province: string;

  @Column()
  mobile: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
