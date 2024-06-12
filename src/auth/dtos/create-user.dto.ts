import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "src/typeorm/entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;
    
    @IsNotEmpty()
    readonly password: string;
    
    @IsNotEmpty()
    @IsEnum(UserRole)
    readonly role: UserRole;
}