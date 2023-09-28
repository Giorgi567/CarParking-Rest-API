import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingZoneEntity } from 'src/Entity/parking.entity';
import { CarsModule } from 'src/cars/cars.module';
import { UsersModule } from 'src/Users/users.module';

@Module({
  exports: [ParkingService],
  imports: [
    TypeOrmModule.forFeature([ParkingZoneEntity]),
    CarsModule,
    // UsersModule, //this line
  ],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
