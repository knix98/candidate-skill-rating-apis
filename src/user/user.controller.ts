import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../typeorm/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

//   @Post()
//   create(@Body() createUser: Partial<User>): Promise<User> {
//     return this.userService.create(createUser);
//   }

  @Get()
  async findAll(): Promise<User[]> {
    let users: User[] = await this.userService.findAll();
    users = users.map((user) => {
      const { password, ...rest } = user;
      return rest as any;
    });
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<User>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...rest } = user;
    return rest;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<void> {
    await this.userService.update(id, updateUser);
    throw new HttpException('User updated successfully', HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
    throw new HttpException('User deleted successfully', HttpStatus.OK);
  }
}
