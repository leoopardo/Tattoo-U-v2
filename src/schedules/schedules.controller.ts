import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post('/:ownerId')
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.schedulesService.create(ownerId, createScheduleDto);
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
  async update(
    @Param('id') id: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.schedulesService.update(id, createScheduleDto);
  }

  @Delete('/:ownerId/:id')
  remove(@Param('ownerId') ownerId: string, @Param('id') id: string) {
    return this.schedulesService.remove(ownerId, id);
  }
}
