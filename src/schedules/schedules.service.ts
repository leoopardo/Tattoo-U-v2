import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
    @InjectModel(Schedule.name)
    private readonly schedule: Model<Schedule>,
  ) {}

  async create(ownerId: string, createScheduleDto: CreateScheduleDto) {
    const ScheduleModel: CreateScheduleDto = {
      owner: ownerId,
      date: createScheduleDto.date,
      art: createScheduleDto.art,
      client: createScheduleDto.client,
      price: createScheduleDto.price,
    };
    const NewSchedule = await this.schedule.create(ScheduleModel);
    const owner: User = await this.user.findById(ownerId);
    owner.schedules.push(NewSchedule._id);
    const updatedOwner = await this.user.findByIdAndUpdate(ownerId, owner);
    return { NewSchedule, updatedOwner };
  }

  findAll() {
    return this.schedule.find();
  }

  // findById(id){
  //   return this.schedule.findById({_id: id});
  // }

  findByArtist(ownerId: string) {
    return this.schedule.find({ owner: ownerId });
  }

  async update(id: string, updateScheduleDto: CreateScheduleDto) {
    return await this.schedule.findByIdAndUpdate(
      { _id: id },
      updateScheduleDto,
    );
  }

  async remove(ownerId: string, id: string) {
    const owner: User = await this.user.findById(ownerId);
    const scheduleToDelete = await this.schedule.findById({ _id: id });

    const newArr = [];
    for (const schedule of owner.schedules) {
      console.log(scheduleToDelete._id.toString(), schedule.toString());
      if (scheduleToDelete._id.toString() == schedule.toString()) {
        console.log(schedule, 'deleted');
        continue;
      }
      newArr.push(schedule);
    }
    owner.schedules = newArr;

    // const newSchedule = owner.schedules.map((s: any) => {
    //   console.log(s);
    // });
    // owner.schedules = newSchedule;
    await this.user.findByIdAndUpdate(ownerId, owner);
    // console.log(newSchedule);
    return this.schedule.findByIdAndDelete({ _id: id });
  }
}
