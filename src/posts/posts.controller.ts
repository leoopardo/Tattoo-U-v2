import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/:ownerId')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createPostDto: PostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.postsService.uploadImageToCloudNary(file);
    console.log(upload, 'aqui');
    return this.postsService.create(ownerId, createPostDto, upload.url);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() createPostDto: PostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.postsService.uploadImageToCloudNary(file);
    return this.postsService.update(id, createPostDto, upload.url);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
