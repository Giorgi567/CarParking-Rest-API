import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, // Use ManyToOne for the ParkingZoneEntity side
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { CarEntity } from './cars.entity';

@Entity()
export class ParkingZoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  location: string;

  @Column()
  HourlyparkingPrice: number;

  @Column({ default: 0 })
  startTime: Date;

  @Column({ default: 0 })
  endTime: Date;

  @Column({ default: false })
  expired: boolean;

  @ManyToOne(() => UserEntity, (user) => user.parkingZone)
  @JoinColumn({ name: 'CarOwnerId' })
  owner: UserEntity;

  @OneToMany(() => CarEntity, (car) => car.parkingZone) // One parking zone can have many parked cars
  @JoinColumn({ name: 'ParkedHistory' })
  parkingExpiredHistory: CarEntity[];

  @OneToMany(() => CarEntity, (car) => car.parkingZone) // One parking zone can have many parked cars
  @JoinColumn({ name: 'ParkedHistory' })
  parkingOnGoingistory: CarEntity[];
}
