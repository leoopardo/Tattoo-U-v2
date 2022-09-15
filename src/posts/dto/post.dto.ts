import { ObjectId } from 'mongoose';
import { postLikes } from 'src/types/post-likes-types';
import { IsString } from 'class-validator';

export class PostDto {
  owner: ObjectId;
  postImage: any;
  @IsString()
  postTitle: string;
  likes: postLikes[];
}
