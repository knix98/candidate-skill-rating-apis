import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResponseService } from './question-response.service';

describe('QuestionResponseService', () => {
  let service: QuestionResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionResponseService],
    }).compile();

    service = module.get<QuestionResponseService>(QuestionResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
