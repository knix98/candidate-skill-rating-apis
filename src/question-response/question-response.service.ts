import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionResponse } from '../typeorm/entities/question-response.entity';

@Injectable()
export class QuestionResponseService {
  constructor(
    @InjectRepository(QuestionResponse)
    private questionResponseRepository: Repository<QuestionResponse>,
  ) {}

  create(questionResponse: Partial<QuestionResponse>): Promise<QuestionResponse> {
    const newQuestionResponse = this.questionResponseRepository.create(questionResponse);
    return this.questionResponseRepository.save(newQuestionResponse);
  }

  findAll(): Promise<QuestionResponse[]> {
    return this.questionResponseRepository.find({ relations: ['candidate', 'reviewer'] });
  }

  findOne(id: number): Promise<QuestionResponse> {
    return this.questionResponseRepository.findOne({
      where: { id },
      relations: ['candidate', 'reviewer'],
    });
  }

  update(id: number, updateQuestionResponse: Partial<QuestionResponse>): Promise<void> {
    return this.questionResponseRepository.update(id, updateQuestionResponse).then(() => undefined);
  }

  remove(id: number): Promise<void> {
    return this.questionResponseRepository.delete(id).then(() => undefined);
  }

  async getAggregatedSkills(candidateId: number): Promise<{ skillId: number; rating: number }[]> {
    const responses = await this.questionResponseRepository.find({ where: { candidate: { id: candidateId } } });

    const skillRatings = responses.reduce((acc, response) => {
      const { skillId, difficultyLevel, rating } = response;
      if (!rating) return acc;

      if (!acc[skillId]) {
        acc[skillId] = { totalWeightedRating: 0, totalWeight: 0 };
      }

      const weight = difficultyLevel === 'easy' ? 1 : difficultyLevel === 'medium' ? 2 : 3;
      acc[skillId].totalWeightedRating += weight * rating;
      acc[skillId].totalWeight += weight;

      return acc;
    }, {});

    return Object.keys(skillRatings).map(skillId => ({
      skillId: parseInt(skillId),
      rating: skillRatings[skillId].totalWeightedRating / skillRatings[skillId].totalWeight,
    }));
  }
}