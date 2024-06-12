import { Controller, Get, Post, Body, Param, Put, Delete, SetMetadata, UseGuards, Query, Request, HttpException, HttpStatus } from '@nestjs/common';
import { QuestionResponseService } from './question-response.service';
import { QuestionResponse } from '../typeorm/entities/question-response.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ROLES_KEY, RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateResult } from 'typeorm';
import { CreateQuestionDto, UpdateQuestionDto } from './dtos/create-question.dto';

@UseGuards(AuthGuard)
@Controller('question-responses')
export class QuestionResponseController {
  constructor(private readonly questionResponseService: QuestionResponseService) {}

  @Post()
  create(@Body() createQuestionResponse: CreateQuestionDto, @Request() req): Promise<QuestionResponse> {
    const userId = req.user.user_id;
    const userRole = req.user.role;
    return this.questionResponseService.create(createQuestionResponse, userId, userRole);
  }

  @Get('candidate-questions')
  async findAllCandidateQuestions(@Query('candidate-id') id: number): Promise<QuestionResponse[]> {
    let resp: QuestionResponse[] = await this.questionResponseService.findAllCandidateQuestions(id);
    if(!resp || !resp.length) {
      throw new HttpException('No questions found', HttpStatus.NOT_FOUND);
    }

    resp = resp.map((question) => {
      const { candidate, ...rest } = question;
      return rest as any;
    })
    return resp;
  }

  @Get('reviewer-questions')
  @SetMetadata(ROLES_KEY, ['reviewer'])
  @UseGuards(RolesGuard)
  async findAllReviewerQuestions(@Query('reviewer-id') id: number): Promise<QuestionResponse[]> {
    let resp: QuestionResponse[] = await this.questionResponseService.findAllReviewerQuestions(id);
    if(!resp || !resp.length) {
      throw new HttpException('No questions found', HttpStatus.NOT_FOUND);
    }

    resp = resp.map((question) => {
      const { candidate, ...rest } = question;
      return rest as any;
    })
    return resp;
  }

  @Get()
  async findOne(@Query('question-id') id: number): Promise<any> {
    const resp: QuestionResponse = await this.questionResponseService.findOne(id);
    if(!resp) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    const { role, password, ...candidate } = resp.candidate;
    resp.candidate = candidate as any;
    return resp;
  }

  @Put()
  async update(@Query('question-id') id: number, @Body() updateQuestionResponse: UpdateQuestionDto): Promise<UpdateResult> {
    await this.questionResponseService.update(id, updateQuestionResponse);
    throw new HttpException('Question updated successfully', HttpStatus.OK);
  }

  @Delete()
  async remove(@Query('question-id') id: number): Promise<void> {
    await this.questionResponseService.remove(id);
    throw new HttpException('Question deleted successfully', HttpStatus.OK);
  }

  @Put(':id/rate')
  @SetMetadata(ROLES_KEY, ['reviewer'])
  @UseGuards(RolesGuard)
  async rateResponse(@Param('id') id: number, @Body('rating') rating: number): Promise<void> {
    await this.questionResponseService.rateResponse(id, rating);
    throw new HttpException('Question rated successfully', HttpStatus.OK);
  }

  @Get('aggregated-skills/:candidateId')
  getAggregatedSkills(@Param('candidateId') candidateId: number): Promise<{ skillId: number; rating: number }[]> {
    return this.questionResponseService.getAggregatedSkills(candidateId);
  }
}
