import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly User: Model<User>,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createUserDto: UserDto, file: Express.Multer.File) {
    const user: UserDto = {
      profilePicture: await this.cloudinary.uploadImage(file).catch(() => {
        console.log('Invalid file type.');
      }),
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      role: createUserDto.role,
      posts: [],
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
    return this.User.findById({ _id: id }).exec();
  }

  update(id: string, updateUserDto: UserDto) {
    return this.User.findByIdAndUpdate({ _id: id }, updateUserDto).exec();
  }

  remove(id: string) {
    return this.User.findByIdAndDelete({ _id: id }).exec();
  }
}
