import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { ROLE } from '../enums/user.role.enum';
import { OneToMany } from 'typeorm';
import { CarEntity } from 'src/Entity/cars.entity';
import { ParkingZoneEntity } from 'src/Entity/parking.entity';

export class updateUserDTO {
  @IsString()
  @Max(60)
  @Min(0)
  Username: string;

  @IsString()
  email: string;

  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(0)
  @Max(9000000)
  AccountBalance: number = 100;

  @OneToMany(() => CarEntity, (car) => car.owner, { cascade: true })
  cars: CarEntity[];

  @OneToMany(() => ParkingZoneEntity, (parkingZone) => parkingZone.owner, {
    cascade: true,
  })
  parkingZone: ParkingZoneEntity[];

  @IsString()
  password: string;
}
