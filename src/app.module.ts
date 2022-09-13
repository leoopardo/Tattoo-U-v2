import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});
const mongooseModule = MongooseModule.forRootAsync({
  useFactory: async (configService: ConfigService) => {
    return configService.get('database.global');
  },
  inject: [ConfigService],
});

@Module({
  imports: [
    configModule,
    mongooseModule,
    UsersModule,
    PostsModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
