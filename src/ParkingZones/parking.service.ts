import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingZoneEntity } from 'src/Entity/parking.entity';
import { Repository } from 'typeorm';
import { updateParkingDTO } from './DTO/update.parking.DTO';
import { createParkingDTO } from './DTO/create.parking.DTO';
import { NotFoundException } from '@nestjs/common';
import { reserveParkingDTO } from './DTO/reserve.parking.DTO';
import { CarsService } from 'src/cars/cars.service';
import { CarEntity } from 'src/Entity/cars.entity';
import { UserEntity } from 'src/Entity/users.entity';
import { UsersService } from 'src/Users/users.service';
// import { errorHandler } from 'src/helper/error.handler';
@Injectable()
export class ParkingService {
  constructor(
    private carService: CarsService,
    @InjectRepository(ParkingZoneEntity)
    private parkingRepo: Repository<ParkingZoneEntity>,
  ) {}

  async getParkingZones() {
    try {
      return await this.parkingRepo.find();
    } catch (error) {
      return new Error(error);
    }
  }

  async getParkingZoneByName(name: string) {
    try {
      return await this.parkingRepo.findOne({ where: { name } });
    } catch (error) {
      return new Error(error);
    }
  }
  async createParkingZone(Body: createParkingDTO) {
    try {
      const parkingZone = await this.parkingRepo.create(Body);
      console.log(parkingZone);

      return await this.parkingRepo.save(parkingZone);
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  }
  async updateParkingZone(id: number, Body: Partial<updateParkingDTO>) {
    console.log(`here`);
    try {
      const parkingZone = await this.parkingRepo.findOne({ where: { id: id } });
      if (!parkingZone) {
        return new NotFoundException(
          `parkingZone with this id ${parkingZone.id} was not found`,
        );
      }

      Object.assign(parkingZone, Body);
      await this.parkingRepo.save(parkingZone);
      return parkingZone;
    } catch (error) {
      throw new Error(error);
    }
  }

  async reserveParkingZone(Body: reserveParkingDTO, User: UserEntity) {
    const parkingZone = await this.getParkingZoneByName(Body.name);

    if (!(parkingZone instanceof ParkingZoneEntity)) {
      throw new NotFoundException(
        `Parking Zone with ${Body.name} was not found`,
      );
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 3600000); // Calculate endTime

    parkingZone.startTime = startTime;
    parkingZone.endTime = endTime;

    const car = await this.carService.getCarByPlateNumber(Body.plateNumber);
    if (car instanceof CarEntity) {
      parkingZone.owner = User;
    }

    return await this.parkingRepo.save(parkingZone);
  }

  async deleteParkingZone(id: number) {
    try {
      const parkingZone = await this.parkingRepo.findOne({ where: { id: id } });
      console.log(parkingZone, 'DELETE');
      if (!parkingZone) {
        return new NotFoundException(
          `parkingZone with this id ${parkingZone.id} was not found`,
        );
      }
      await this.parkingRepo.remove(parkingZone);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteParkingZonesWithUser(id: number, User: UserEntity) {
    try {
      const parkingZone = await this.parkingRepo.findOne({
        where: { owner: User },
      });
      console.log(parkingZone, 'PARKING ENTITY BEFORE DELETING');

      if (!parkingZone) {
        return;
      }
      await this.parkingRepo.remove(parkingZone);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
