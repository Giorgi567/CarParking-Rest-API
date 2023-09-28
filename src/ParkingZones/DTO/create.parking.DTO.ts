import { ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/Entity/users.entity';
import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class createParkingDTO {
  @IsString()
  @MaxLength(200)
  @MinLength(0)
  name: string;

  @IsString()
  @MaxLength(200)
  @MinLength(0)
  location: string;

  @Min(0)
  @IsNumber()
  HourlyparkingPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.parkingZone)
  @JoinColumn({ name: 'CarOwnerId' })
  owner: UserEntity;
}
