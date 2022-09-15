import { UpdateUserDto } from './dto/updateUser.dto';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Post } from 'src/posts/entities/post.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly User: Model<User>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudNary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      console.log('Invalid file type.');
    });
  }
  async create(createUserDto: UserDto, imageUrl: string) {
    const user = {
      profilePicture: imageUrl,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      role: createUserDto.role,
      country: createUserDto.country,
      state: createUserDto.state,
      city: createUserDto.city,
      password: await argon2.hash(createUserDto.password),
    };

    if (!user.profilePicture) user.profilePicture = '';

    return this.User.create(user);
  }
  async updateRefreshToken(id: string, refreshToken: string) {
    return await this.User.findByIdAndUpdate(id, { refreshToken }).exec();
  }

  findAll() {
    return this.User.find().exec();
  }

  async findOne(email: string) {
    return await this.User.findOne({ email }).exec();
  }

  findById(id: string) {
    return this.User.findById({ _id: id })
      .populate('posts', null, Post.name)
      .populate('schedules', null, Schedule.name)
      .exec();
  }

  update(id: string, updateUserDto: UpdateUserDto, url) {
    let update;
    url
      ? (update = {
          profilePicture: url,
        })
      : (update = updateUserDto);

    return this.User.findByIdAndUpdate({ _id: id }, update).exec();
  }

  remove(id: string) {
    return this.User.findByIdAndDelete({ _id: id }).exec();
  }
}
