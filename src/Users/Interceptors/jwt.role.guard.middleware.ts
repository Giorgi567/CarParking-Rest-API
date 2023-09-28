// jwt.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // Import the NestJS JWT module
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UsersService } from '../users.service';
import { UserEntity } from 'src/Entity/users.entity';
@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // You can throw an exception or return a response here
      // depending on how you want to handle unauthorized requests
      // For example:
      throw new UnauthorizedException('Not authorized to access this route');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decodedToken: UserEntity = this.jwtService.verify(token);

      // Now, you have access to the decoded token
      // You can perform actions like fetching the user, etc.
      // Example:
      const user = await this.userService.getUser(decodedToken.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = user;

      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
