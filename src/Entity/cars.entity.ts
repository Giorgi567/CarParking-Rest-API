// cars.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { CarType } from 'src/cars/Enums/car.type.enum';
import { IsEnum } from 'class-validator';
import { ParkingZoneEntity } from './parking.entity'; // Import ParkingZoneEntity

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Manufacturer: string;

  @Column()
  Model: string;

  @IsEnum(CarType, { message: 'INVALID CAR TYPE' })
  Type: CarType;

  @Column()
  year: number;

  @Column({ unique: true })
  carPlateNumber: string;

  @Column()
  Milage: number;

  @Column()
  Price: number;

  @Column()
  Transmission: string;

  @ManyToOne(() => UserEntity, (user) => user.cars)
  @JoinColumn({ name: 'CarOwnerId' })
  ownerId: UserEntity;

  @ManyToOne(
    () => ParkingZoneEntity,
    (parkingZone) => parkingZone.parkingExpiredHistory,
  ) // Many cars can belong to one parking zone
  @JoinColumn({ name: 'parkingZoneId' })
  parkingZone: ParkingZoneEntity;
}
