import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/Entity/users.entity';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { CarType } from '../Enums/car.type.enum';
import { Transmission } from '../Enums/car.transmition.enum';

export class updateCarDTO {
  @IsString()
  Manufacturer: string;

  @IsString()
  Model: string;

  @IsEnum(CarType, { message: 'INVALID CAR TYPE' })
  Type: CarType;

  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number;

  @IsString()
  carPlateNumber: string;

  @IsNumber()
  @Min(0)
  @Max(600000)
  Milage: number;

  @IsNumber()
  @Min(0)
  @Max(9000000)
  Price: number;

  @IsEnum(Transmission, { message: 'INVALID TRANSMISSION TYPE' })
  Transmission: Transmission;

  @ManyToOne(() => UserEntity, (user) => user.cars)
  @JoinColumn({ name: 'CarOwnerId' })
  owner: UserEntity;
}
