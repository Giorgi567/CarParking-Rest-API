import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDTO } from 'src/Users/DTO/create.user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from '../users.service';
import { singInDTO } from '../DTO/signIn.user.dto';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/Entity/users.entity';
import { sendJWT } from 'src/helper/jwt.sender';

const scrypt = promisify(_scrypt);

@Injectable()
export class authService {
  constructor(private userService: UsersService) {}

  async signUp(Body: createUserDTO) {
    try {
      console.log(`bruh`);
      const user = await this.userService.getUserByEmail(Body.email);

      if (user) {
        return new BadRequestException(
          `User with this email ${Body.email} already exists`,
        );
      }
      console.log(`bruh2`);

      const password: string = Body.password;
      const salt = randomBytes(20).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;

      const results = salt + '/' + hash.toString('hex');
      Body.password = results;

      const finalUser = await this.userService.createUser(Body);

      const jwt = sendJWT(String(finalUser.id));

      return { ACCESS_TOKEN: jwt };
    } catch (error) {
      console.log('error::', error);
      throw new BadRequestException(error);
    }
  }

  async signIn(Body: singInDTO) {
    const user = await this.userService.getUserByEmail(Body.email);
    console.log(`FOUDN`);
    if (!user) {
      return new NotFoundException(
        `User with this email ${Body.email} was not foudn`,
      );
    }
    if (user instanceof UserEntity) {
      const { password } = user;
      const [salt, hash] = password.split('/');
      const testHash = (await scrypt(Body.password, salt, 32)) as Buffer;

      if (testHash.toString('hex') === hash) {
        const jwt = sendJWT(String(user.id));
        console.log(jwt);
        return { ACCESS_TOKEN: jwt };
      } else {
        return new NotFoundException('Wrong Emasil or Password');
      }
    }
  }

  async logOut() {
    return { ACCESS_TOKEN: null };
  }
}
