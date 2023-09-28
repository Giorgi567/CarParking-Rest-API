import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/Entity/users.entity';
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class updateParkingDTO {
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  name: string;

  @IsString()
  @MaxLength(200)
  @MinLength(0)
  location: string;

  @IsNumber()
  @Min(0)
  HourlyparkingPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.parkingZone)
  @JoinColumn({ name: 'CarOwnerId' })
  owner: UserEntity;
}
