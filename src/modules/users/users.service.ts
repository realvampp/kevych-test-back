import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log('id', id);
      console.log('error', error);
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, body: Partial<User>) {
    await this.userRepository.update(id, body);
    return this.findById(id);
  }

  async create(body: RegisterDto) {
    return this.userRepository.save(body);
  }
}
