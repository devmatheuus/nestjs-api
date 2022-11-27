import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.create(createUserDto);
  }

  public findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  public async findOne(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }

  public async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.update(userId, updateUserDto);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  public async remove(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.remove(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }
}
