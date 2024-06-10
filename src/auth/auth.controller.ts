import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log("auth.controller.ts => login => loginUserDto :", loginUserDto);
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
