import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity()
export class QuestionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skillId: number;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
  })
  difficultyLevel: DifficultyLevel;

  @Column()
  question: string;

  @Column({ nullable: true })
  response: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne(() => User, (user) => user.id)
  candidate: User;

  @ManyToOne(() => User, (user) => user.id)
  reviewer: User;
}