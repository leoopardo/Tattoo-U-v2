import { User } from 'src/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseShema } from 'mongoose';
import { postLikes } from 'src/types/post-likes-types';

@Schema({ timestamps: true })
class Post extends Document {
  @Prop({ type: MongooseShema.Types.ObjectId, rel: 'users' })
  owner: User;
  @Prop()
  postImage: string;
  @Prop()
  postTitle: string;
  @Prop({ type: MongooseShema.Types.ObjectId, ref: 'users' })
  likes: postLikes[];
}
const PostSchema = SchemaFactory.createForClass(Post);

export { Post, PostSchema };
