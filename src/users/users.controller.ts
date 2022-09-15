import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtAccessTokenAuthGuard } from './../auth/guards/jwt-access-token-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserDecorator } from './user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  async create(
    @Body() createUserDto: UserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.usersService.uploadImageToCloudNary(file);
    return await this.usersService.create(createUserDto, upload.url);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('/me')
  getMe(@UserDecorator() user: User) {
    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.usersService.uploadImageToCloudNary(file);
    return await this.usersService.update(id, updateUserDto, upload.url);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
