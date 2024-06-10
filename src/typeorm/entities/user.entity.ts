import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  CANDIDATE = 'candidate',
  REVIEWER = 'reviewer',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column()
  password: string;
}