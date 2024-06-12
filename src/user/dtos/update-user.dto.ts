import { IsEnum, IsOptional } from "class-validator";
import { UserRole } from "src/typeorm/entities/user.entity";

export class UpdateUserDto {
    @IsOptional()
    readonly name: string;

    @IsOptional()
    @IsEnum(UserRole)
    readonly role: UserRole;
}