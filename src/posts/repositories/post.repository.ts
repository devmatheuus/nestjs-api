import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../../common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail, ...createPostDtoWithoutEmail } = createPostDto;

    const user = await this.prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDtoWithoutEmail,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    const post = await this.prisma.post.create({ data });

    return post;
  }

  public async findOne(postId: number): Promise<PostEntity | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return post;
  }

  public async findAll(): Promise<PostEntity[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return posts;
  }

  public async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const { authorEmail, ...updatePostDtoWithoutEmail } = updatePostDto;

    if (!authorEmail) {
      const post = await this.prisma.post.update({
        data: updatePostDto,
        where: { id: postId },
      });

      return post;
    }

    const user = await this.prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDtoWithoutEmail,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    const post = await this.prisma.post.update({
      where: { id: postId },
      data: data,
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  public async remove(postId: number): Promise<PostEntity> {
    const post = await this.prisma.post.delete({ where: { id: postId } });

    return post;
  }
}
