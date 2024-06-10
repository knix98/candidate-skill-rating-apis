import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // making a repository out of User entity. userRepository would give us the api/functions to interact with the User/users entity/table
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  async findByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }

  update(id: number, updateUser: Partial<User>): Promise<void> {
    return this.userRepository.update(id, updateUser).then(() => undefined);
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => undefined);
  }
}
