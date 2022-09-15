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
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post('/:ownerId')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createScheduleDto: CreateScheduleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.schedulesService.uploadImageToCloudNary(
      file,
    );
    return this.schedulesService.create(ownerId, createScheduleDto, upload.url);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get()
  @Get(':ownerId')
  findOne(@Param('ownerId') id: string) {
    return this.schedulesService.findByArtist(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() createScheduleDto: CreateScheduleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.schedulesService.uploadImageToCloudNary(
      file,
    );
    return this.schedulesService.update(id, createScheduleDto, upload.url);
  }

  @Delete('/:ownerId/:id')
  remove(@Param('ownerId') ownerId: string, @Param('id') id: string) {
    return this.schedulesService.remove(ownerId, id);
  }
}
