import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: async (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get('cloudinary.cloudinaryName'),
      api_key: configService.get('cloudinary.cloudinaryApiKey'),
      api_secret: configService.get('cloudinary.cloudinarySecret'),
    });
  },
  inject: [ConfigService],
};
