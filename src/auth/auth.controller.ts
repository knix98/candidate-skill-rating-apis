import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from 'src/typeorm/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    if(createUserDto.role == UserRole.CANDIDATE) {
      throw new HttpException(`Successfully registered as ${UserRole.CANDIDATE}`, HttpStatus.OK);
    }
    else {
      throw new HttpException(`Successfully registered as ${UserRole.REVIEWER}`, HttpStatus.OK);
    }
  }
}
