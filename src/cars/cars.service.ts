import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from 'src/Entity/cars.entity';
import { Repository } from 'typeorm';
import { updateCarDTO } from './DTO/car.update.DTO';
import { createCarDTO } from './DTO/car.create.DTO';
import { UserEntity } from 'src/Entity/users.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity) private repo: Repository<CarEntity>,
  ) {}
  async getAllCars() {
    return await this.repo.find();
  }

  async getCarByPlateNumber(plateNumber: string) {
    const car = await this.repo.findOne({
      where: { carPlateNumber: plateNumber },
    });
    if (!car) {
      return new Error(
        `No Cars were found with this ${plateNumber} plate Number`,
      );
    }
    return car;
  }

  async getCarByYear(year: number) {
    try {
      const cars = await this.repo.findOne({ where: { year: year } });

      if (cars) {
        return cars;
      } else {
        return new NotFoundException(
          `Cars with this year ${year} was not found `,
        );
      }
    } catch (error) {
      return new NotFoundException(`Car with this year ${year} was not found`);
    }
  }

  async getCarByBrand(Manufacturer: string) {
    console.log('IM in');
    const cars = await this.repo.findOne({
      where: { Manufacturer: Manufacturer },
    });
    if (cars) {
      return cars;
    } else {
      return new NotFoundException(
        `Cars with this brand ${Manufacturer} was not found `,
      );
    }
  }

  async getUserCars(user: UserEntity) {
    try {
      const cars = await this.repo.find({ where: { ownerId: user } }); // this searches trouh entire DB for spicific users cars i know its VERY inneficent but since sqlite doesnt support embeded ids i had to leave it like this but in real life projects we wont be using sqlite so just ignore this VERY inneficent method lol.
      return cars;
    } catch (error) {
      return new Error(error);
    }
  }
  async createCar(Body: createCarDTO) {
    try {
      console.log(`in Cars service`);

      const Car = await this.repo.create(Body);
      console.log(Car);

      return await this.repo.save(Car);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCar(id: number, Body: Partial<updateCarDTO>) {
    try {
      const car = await this.repo.findOne({ where: { id: id } });
      if (!car) {
        return new NotFoundException(
          `Car with this id ${car.id} was not found`,
        );
      }

      Object.assign(car, Body);
      await this.repo.save(car);
      return car;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCar(id: number) {
    try {
      const car = await this.repo.findOne({ where: { id: id } });
      if (!car) {
        return new NotFoundException(
          `car with this id ${car.id} was not found`,
        );
      }
      await this.repo.remove(car);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCarWithUser(User: UserEntity) {
    try {
      const car = await this.repo.findOne({ where: { ownerId: User } });
      console.log(car, 'bru');

      if (!car) {
        console.log(`incarDelteUser`);
        return;
      }
      await this.repo.remove(car);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
