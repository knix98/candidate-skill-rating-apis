import { UserRole } from "src/typeorm/entities/user.entity";

export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly role: UserRole;
}