import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';

@Module({
  /*
  The imports array is used to import other modules that are required by this module.
  TypeOrmModule.forFeature() is used to define which repositories are registered in the current scope. 
  This makes the UserRepository available for dependency injection in the UserService.
  */
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
