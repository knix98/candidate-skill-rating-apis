export class CreateQuestionDto {
    readonly skillId?: string;
    readonly difficultyLevel?: string;
    readonly question: string;
}