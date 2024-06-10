import { Controller, Get, Post, Body, Param, Put, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { QuestionResponseService } from './question-response.service';
import { QuestionResponse } from '../typeorm/entities/question-response.entity';
import { AuthGuard, ROLES_KEY } from 'src/auth/guards/auth.guard';

@Controller('question-responses')
export class QuestionResponseController {
  constructor(private readonly questionResponseService: QuestionResponseService) {}

  @Post()
  create(@Body() createQuestionResponse: Partial<QuestionResponse>): Promise<QuestionResponse> {
    return this.questionResponseService.create(createQuestionResponse);
  }


  @Get()
  @SetMetadata(ROLES_KEY, ['reviewer', 'candidate'])
  @UseGuards(AuthGuard)
  findAll(): Promise<QuestionResponse[]> {
    return this.questionResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<QuestionResponse> {
    return this.questionResponseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateQuestionResponse: Partial<QuestionResponse>): Promise<void> {
    return this.questionResponseService.update(id, updateQuestionResponse);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.questionResponseService.remove(id);
  }

  @Get('aggregated-skills/:candidateId')
  getAggregatedSkills(@Param('candidateId') candidateId: number): Promise<{ skillId: number; rating: number }[]> {
    return this.questionResponseService.getAggregatedSkills(candidateId);
  }
}
