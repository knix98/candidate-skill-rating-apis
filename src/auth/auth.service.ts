import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/typeorm/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({username, password}: { username: string, password: string }): Promise<{ access_token: string }> {
    const user = await this.userService.findByName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, username: user.name, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException("Invalid credentials");
  }

  async register({username, password, role}: { username: string, password: string, role: UserRole }) {
    const user = await this.userService.findByName(username);
    if(user) {
      throw new ForbiddenException('username already registered. Please try with another username');
    }

    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.userService.create({ name: username, role, password: hashedPassword });
  }
}
