import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity'; // Updated import path
import { authService } from './Authentication/auth.service';
import { CarsModule } from 'src/cars/cars.module';
import { ParkingModule } from 'src/ParkingZones/parking.module';
@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity]), ParkingModule, CarsModule],
  controllers: [UsersController],
  providers: [UsersService, authService],
})
export class UsersModule {}
