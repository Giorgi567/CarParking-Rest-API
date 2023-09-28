import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { UserEntity } from './Entity/users.entity';
import { CarsModule } from './cars/cars.module';
import { CarEntity } from './Entity/cars.entity';
import { ParkingZoneEntity } from './Entity/parking.entity';
import { ParkingModule } from './ParkingZones/parking.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `/config/.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: 'DB.sqlite',
          entities: [UserEntity, CarEntity, ParkingZoneEntity],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    CarsModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
