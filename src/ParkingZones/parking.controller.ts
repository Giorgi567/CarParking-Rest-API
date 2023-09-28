import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ParkingService } from './parking.service';
import { createParkingDTO } from './DTO/create.parking.DTO';
import { updateParkingDTO } from './DTO/update.parking.DTO';
@Controller('parking')
export class ParkingController {
  constructor(private parkingRepo: ParkingService) {}

  @Get()
  async getAllParkingZones() {
    return await this.parkingRepo.getParkingZones();
  }

  @Post()
  async createParkingZone(@Body() Body: createParkingDTO) {
    return await this.parkingRepo.createParkingZone(Body);
  }

  @Put('/:id')
  async updateParkingZone(
    @Param('id') id: string,
    @Body() Body: Partial<updateParkingDTO>,
  ) {
    return await this.parkingRepo.updateParkingZone(+id, Body);
  }

  @Delete('/:id')
  async deleteParkingZone(@Param('id') id: string) {
    return await this.parkingRepo.deleteParkingZone(+id);
  }
}
