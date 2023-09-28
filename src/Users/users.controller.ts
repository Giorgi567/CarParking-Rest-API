import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './DTO/create.user.dto';
import { updateUserDTO } from './DTO/update.user.dto';
import { authService } from 'src/Users/Authentication/auth.service';
import { singInDTO } from './DTO/signIn.user.dto';
import { UserEntity } from 'src/Entity/users.entity';
import { retry } from 'rxjs';
import { ParkingService } from 'src/ParkingZones/parking.service';
import { reserveParkingDTO } from 'src/ParkingZones/DTO/reserve.parking.DTO';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(
    private userService: UsersService,
    private parkingService: ParkingService,
    private authService: authService,
  ) {}

  @Post('/signUp')
  async signUp(@Body() Body: createUserDTO, @Session() session: any) {
    const user = await this.authService.signUp(Body);
    if (user instanceof UserEntity) {
      session.userId = user.id;
    }
    return user;
  }

  @Post('/signIn')
  async signIn(@Body() Body: singInDTO, @Session() session: any) {
    const user = await this.authService.signIn(Body);
    if (user instanceof UserEntity) {
      session.userId = user.id;
    }
    return user;
  }

  @Get()
  async getAllUsers(@Session() Session: any) {
    return await this.userService.getAllUsers();
  }

  @Get('/usersCars/:id')
  async getUserCars(@Param('id') id: string) {
    return await this.userService.getUsersCars(+id);
  }

  @Post()
  async getCerateUSers(id: string) {}
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() Body: Partial<updateUserDTO>,
  ) {
    return this.userService.updateUser(+id, Body);
  }

  @Post()
  async createUser(@Body() Body: createUserDTO) {
    console.log(`in controller`);
    return await this.userService.createUser(Body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }

  @Post('/reserveParkingZone')
  async reserveParkingZone(@Body() Body: reserveParkingDTO) {
    // return await this.parkingService.reserveParkingZone(Body);
  }
}
