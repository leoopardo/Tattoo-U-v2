import { User } from 'src/users/entities/user.entity';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './dto/post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly post: Model<Post>,
    @InjectModel(User.name)
    private readonly user: Model<User>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudNary(file: Express.Multer.File) {
    try {
      return await this.cloudinary.uploadImage(file);
    } catch (error) {
      console.error(error);
    }
  }

  async create(ownerId: string, createPostDto: PostDto, imageUrl: string) {
    const owner: any = await this.user.findById({ _id: ownerId });
    const post: PostDto = {
      owner: owner._id,
      postImage: imageUrl,
      postTitle: createPostDto.postTitle,
      likes: createPostDto.likes,
    };
    if (!post.postImage) post.postImage = '';
    const newPost = await this.post.create(post);
    owner.posts.push(newPost._id);
    const updatedUser = await this.user.findByIdAndUpdate(
      { _id: ownerId },
      owner,
    );

    return { newPost, updatedUser };
  }

  async findAll() {
    const allPosts = await this.post.find().exec();
    return allPosts.sort((a: any, b: any) => {
      return b.createdAt - a.createdAt;
    });
  }

  async findOne(id: number) {
    return await this.post.findById({ _id: id });
  }

  async update(id: string, updatePostDto: PostDto, imageUrl: string) {
    const post: PostDto = {
      owner: updatePostDto.owner,
      postImage: imageUrl,
      postTitle: updatePostDto.postTitle,
      likes: updatePostDto.likes,
    };
    if (!post.postImage) post.postImage = '';
    return await this.post.findByIdAndUpdate({ _id: id }, post);
  }

  async remove(id: number) {
    return this.post.findByIdAndDelete({ _id: id });
  }
}
