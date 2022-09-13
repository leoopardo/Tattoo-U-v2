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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserDecorator } from './user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createUserDto: UserDto, file: Express.Multer.File) {
    return await this.usersService.create(createUserDto, file);
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
  async update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
