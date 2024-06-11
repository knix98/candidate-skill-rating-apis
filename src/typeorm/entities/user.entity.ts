import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionResponse } from './question-response.entity';

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

  @OneToMany(() => QuestionResponse, (questionResponse) => questionResponse.candidate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  candidateResponses: QuestionResponse[];

  @OneToMany(() => QuestionResponse, (questionResponse) => questionResponse.reviewer, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  reviewerResponses: QuestionResponse[];
}