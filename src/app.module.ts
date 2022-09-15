import { ChatGateway } from './chat.gateway';
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
import { SchedulesModule } from './schedules/schedules.module';

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
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
