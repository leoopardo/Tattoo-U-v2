import { ObjectId } from 'mongoose';
import { postLikes } from 'src/types/post-likes-types';
import { IsOptional, IsString } from 'class-validator';

export class PostDto {
  owner: ObjectId;
  @IsOptional()
  @IsString()
  postImage: any;
  @IsString()
  postTitle: string;
  @IsOptional()
  likes: postLikes[];
}
