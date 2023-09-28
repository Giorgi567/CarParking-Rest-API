import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity';
import { createUserDTO } from './DTO/create.user.dto';
import { updateUserDTO } from './DTO/update.user.dto';
import { CarsService } from 'src/cars/cars.service';
import { ParkingService } from 'src/ParkingZones/parking.service';

@Injectable()
export class UsersService {
  constructor(
    private carRepo: CarsService,
    private parkingService: ParkingService,
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return await this.repo.find();
  }

  async getUser(id: number) {
    try {
      return await this.repo.findOne({ where: { id: id } });
    } catch (error) {
      return new NotFoundException(`User with this id ${id} was not found`);
    }
  }

  async getUserByEmail(email: string) {
    return await this.repo.findOne({ where: { email: email } });
  }

  async getUsersCars(id: number) {
    const user = await this.getUser(id);
    if (user instanceof UserEntity) {
      const cars = await this.carRepo.getUserCars(user);
      return cars;
    }
  }

  async createUser(Body: createUserDTO) {
    try {
      console.log(`in service`);

      const user = this.repo.create(Body);
      console.log(user);

      return await this.repo.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: number, Body: Partial<updateUserDTO>) {
    try {
      const user = await this.repo.findOne({ where: { id: id } });
      if (!user) {
        return new NotFoundException(
          `User with this id ${user.id} was not found`,
        );
      }

      Object.assign(user, Body);
      await this.repo.save(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.repo.findOne({ where: { id: id } });
      if (!user) {
        return new NotFoundException(
          `User with this id ${user.id} was not found`,
        );
      }

      await this.carRepo.deleteCarWithUser(user);

      await this.repo.remove(user);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
