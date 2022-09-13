import { postLikes } from 'src/Types/post-likes-types';
import { IsString } from 'class-validator';

export class PostDto {
  postImage: any;
  @IsString()
  postTitle: string;
  likes: postLikes[];
}
