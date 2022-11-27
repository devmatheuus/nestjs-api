import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/post.repository';
import { PostEntity } from './entities/post.entity';
import { NotFoundError } from '../common/errors/types/NotFoundError';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = await this.postsRepository.create(createPostDto);

    return post;
  }

  public async findAll(): Promise<PostEntity[]> {
    const posts = await this.postsRepository.findAll();
    return posts;
  }

  public async findOne(postId: number): Promise<PostEntity> {
    const post = await this.postsRepository.findOne(postId);

    if (!post) throw new NotFoundError('Post not found.');

    return post;
  }

  public async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postsRepository.update(postId, updatePostDto);

    if (!post) {
      throw new NotFoundError('Post not found.');
    }

    return post;
  }

  public async remove(postId: number): Promise<PostEntity> {
    const post = await this.postsRepository.remove(postId);

    return post;
  }
}
