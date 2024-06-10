import { Module } from '@nestjs/common';
import { QuestionResponseController } from './question-response.controller';
import { QuestionResponseService } from './question-response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionResponse } from 'src/typeorm/entities/question-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionResponse])],
  controllers: [QuestionResponseController],
  providers: [QuestionResponseService]
})
export class QuestionResponseModule {}
