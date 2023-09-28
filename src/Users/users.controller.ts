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
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './DTO/create.user.dto';
import { updateUserDTO } from './DTO/update.user.dto';
import { authService } from 'src/Users/Authentication/auth.service';
import { singInDTO } from './DTO/signIn.user.dto';
import { UserEntity } from 'src/Entity/users.entity';
import { ParkingService } from 'src/ParkingZones/parking.service';
import { reserveParkingDTO } from 'src/ParkingZones/DTO/reserve.parking.DTO';
import { JwtMiddleware } from 'src/Middlewares/jwt.protect.middleware';
import { AuthGuard } from 'src/Middlewares/auth.protect.middleware';
import { RoleProtectMiddleware } from 'src/Middlewares/role.protect.middleware';
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

  @Post('/logOut')
  async logOut(@Session() session: any) {
    const user = await this.authService.logOut();
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(RoleProtectMiddleware)
  async getAllUsers(@Session() Session: any) {
    return await this.userService.getAllUsers();
  }

  @Get('/usersCars/:id')
  @UseGuards(AuthGuard)
  async getUserCars(@Param('id') id: string) {
    return await this.userService.getUsersCars(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async getCerateUSers(id: string) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() Body: Partial<updateUserDTO>,
  ) {
    return this.userService.updateUser(+id, Body);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() Body: createUserDTO) {
    console.log(`in controller`);
    return await this.userService.createUser(Body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(+id);
  }

  @Post('/reserveParkingZone')
  @UseGuards(AuthGuard)
  async reserveParkingZone(@Body() Body: reserveParkingDTO) {
    // return await this.parkingService.reserveParkingZone(Body);
  }
}
