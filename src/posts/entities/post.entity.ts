import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseShema } from 'mongoose';
import { postLikes } from 'src/Types/post-likes-types';

@Schema({ timestamps: true })
class Post extends Document {
  @Prop()
  postImage: any;
  @Prop()
  postTitle: string;
  @Prop({ type: MongooseShema.Types.ObjectId, ref: 'users' })
  likes: postLikes[];
}
const PostSchema = SchemaFactory.createForClass(Post);

export { Post, PostSchema };
