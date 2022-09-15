import { IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class postLikes {
  @IsNumber()
  likes: number;
  hasLiked: ObjectId[];
}
