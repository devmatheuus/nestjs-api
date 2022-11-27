import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });

    return user;
  }

  public async findOne(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });

    return user;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });

    return users;
  }

  public async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
      include: {
        posts: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });

    return user;
  }

  public async remove(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.delete({ where: { id: userId } });

    return user;
  }
}
