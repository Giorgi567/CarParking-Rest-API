import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/Entity/users.entity';
import { ParkingZoneEntity } from 'src/Entity/parking.entity';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class reserveParkingDTO {
  @IsString()
  @Max(200)
  @Min(0)
  name: string;

  @IsString()
  @Max(200)
  @Min(0)
  location: string;

  @ManyToOne(() => UserEntity, (user) => user.parkingZone) //person who reserves the parking lot
  @JoinColumn({ name: 'CarOwnerId' })
  owner: UserEntity;

  @IsString()
  plateNumber: string;

  @IsNumber()
  parkingZone: ParkingZoneEntity; // which parking lot they reserved
}
