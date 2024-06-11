import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { DifficultyLevel } from "src/typeorm/entities/question-response.entity";

export class CreateQuestionDto {
    @IsNotEmpty()
    readonly skillId: number;

    @IsEnum(DifficultyLevel)
    readonly difficultyLevel: DifficultyLevel;
    
    @IsNotEmpty()
    readonly question: string;
    
    @IsOptional()
    readonly response?: string;
    
    @IsOptional()
    readonly rating?: number;
}