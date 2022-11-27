import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  published: boolean;
  title: string;
  content: string | null;
  created_at: Date;
  update_at: Date;
  authorId: number | null;
}
