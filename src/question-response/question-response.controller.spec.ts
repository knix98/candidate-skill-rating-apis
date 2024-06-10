import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResponseController } from './question-response.controller';

describe('QuestionResponseController', () => {
  let controller: QuestionResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionResponseController],
    }).compile();

    controller = module.get<QuestionResponseController>(QuestionResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
