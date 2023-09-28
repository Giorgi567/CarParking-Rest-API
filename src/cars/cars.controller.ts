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
import { CarsService } from './cars.service';
import { createCarDTO } from './DTO/car.create.DTO';
import { updateCarDTO } from './DTO/car.update.DTO';

@Controller('cars')
@Injectable()
export class CarsController {
  constructor(private carService: CarsService) {}
  @Get()
  async getAllCars() {
    return await this.carService.getAllCars();
  }

  @Get('/carBrand/:brand')
  async getCarByBrad(@Param('brand') brand: string) {
    return await this.carService.getCarByBrand(brand);
  }

  @Get('/:year')
  async getCarByYear(@Param('year') year: string) {
    return await this.carService.getCarByYear(+year);
  }

  @Post()
  async createCar(@Body() Body: createCarDTO) {
    return await this.carService.createCar(Body);
  }

  @Put('/:id')
  async updateCar(
    @Param('id') id: string,
    @Body() Body: Partial<updateCarDTO>,
  ) {
    return await this.carService.updateCar(+id, Body);
  }

  @Delete('/:id')
  async deleteCar(@Param('id') id: string) {
    return await this.carService.deleteCar(+id);
  }
}
