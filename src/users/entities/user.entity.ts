import { PostDto } from '../../posts/dto/post.dto';
import { CreateScheduleDto } from '../../schedules/dto/create-schedule.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum UserRole {
  ARTIST = 'ARTIST',
  CLIENT = 'CLIENT',
  API_TOKEN = 'API_TOKEN',
}

@Schema({ timestamps: true })
class User extends Document {
  @Prop()
  profilePicture: string;
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ enum: Object.keys(UserRole), default: UserRole.CLIENT })
  role: string;
  country: string;
  state: string;
  city: string;
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'posts',
    required: false,
  })
  posts: PostDto[];
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'schedules',
    required: false,
  })
  schedules: CreateScheduleDto[];
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } },
);
export { UserRole, User, UserSchema };
