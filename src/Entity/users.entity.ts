import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GENDER } from '../Users/enums/user.gender.enum';
import { ROLE } from '../Users/enums/user.role.enum';
import { CarEntity } from './cars.entity';
import { IsEnum } from 'class-validator';
import { ParkingZoneEntity } from './parking.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Username: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  @IsEnum(ROLE, { message: 'INVALID ROLE' })
  Role: ROLE = ROLE.USER;

  @Column()
  AccountBalance: number = 100;

  @OneToMany(() => CarEntity, (car) => car.owner)
  cars: CarEntity[];

  @OneToMany(() => ParkingZoneEntity, (parkingZone) => parkingZone.owner, {
    cascade: true,
  })
  parkingZone: ParkingZoneEntity[];

  @Column()
  password: string;
}
