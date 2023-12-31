import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/users.entity'; // Updated import path
import { authService } from './Authentication/auth.service';
import { CarsModule } from 'src/cars/cars.module';
import { ParkingModule } from 'src/ParkingZones/parking.module';
import { JwtModule } from '@nestjs/jwt';

// Again I know i should save secret keys and stuff like that in .evn file but because of time limits i had to leave it out in the blank like this
@Module({
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Remove the extra comma here
    JwtModule.register({
      secret:
        'MIICWwIBAAKBgQCQNBc4IP2ewViqE+ZHbnqGoCZFyAUtrxKmO4k/boSvBisJH6BX01ajpafM7c7f5PO+wAcGYIxiTQsv9ml2/cgnB6MWG/YYKDCfbWLNbpvQxYlUCu0fbRHc4dYM3AysBpx/SE9JNAlUoRsuQ05PP3U0IsM9FzYUpyZ9TDR7bjPYyQIDAQABAoGABnnAXS3mFb36/FA+dBC7AdapQVL1IJMPFFXyGN4eqTlur08zRR5hcqHawjIfqyA97d/zsM6fHz70dKftHoHQ/hZKfWsBr2+R8C7rY/tlJhM24kqusDvNA9AMNoQWK4+DF+J05q5a+VWjP07Y976LZjq+vXlEVBfEiHig4wECaDECQQDbRQ5L9Mcibd5aR+Y3LxtXu0agpSG1dYDcWlLzRAt6yDD/EziRV8DSFyvgj1amO0SQ+2K/Hp5BEHiifDJB48ZFAkEAqFv32dNZcBy4IKAAHPgxhsYBcuUCHGfwwxxXJ3DjjZlhuR4K9YjO0alf4zNOlUyoULe9z+OAIgIqI9EyIX2itQJAShMeLVLYIy1yvJUllOb5Gb5Osd6XcLHtgoORGlWWezg+NS3NImy+2zqwvAAwiZ/kHgaO6XnyhJCH8Hx8jf3g8QJAepLKtlo7iXY/T/FtY6oHVNof/+hfSxMZpNOjWGHGKjd7gG0xCWZbPSYVW7LlCanP+URs+0fk592vlHggCWYQ6QJANZzno1FwUOjtGLeKm83ZGdbo3K+00i25FmBgB2d0uAtknoxFVOjsY+eSXHZqNybrhWRAzutSnpz/QEf/7Vg97g==',
    }),
    ParkingModule,
    CarsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, authService],
})
export class UsersModule {}
