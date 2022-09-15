import { User } from 'src/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseShema } from 'mongoose';

@Schema({ timestamps: true })
class Schedule extends Document {
  @Prop({ type: MongooseShema.Types.ObjectId, rel: 'users' })
  owner: User;
  @Prop({ required: true })
  date: string;
  @Prop()
  art: string;
  @Prop()
  client: string;
  @Prop()
  price: string;
}
const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export { Schedule, ScheduleSchema };
