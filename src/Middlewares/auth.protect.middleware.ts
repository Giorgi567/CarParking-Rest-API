import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/Users/users.service';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer ')
    ) {
      const requestToken = request.headers.authorization.split(' ')[1];

      if (requestToken !== 'null') {
        const decoded_request_token = verify(
          requestToken,
          'MIICWwIBAAKBgQCQNBc4IP2ewViqE+ZHbnqGoCZFyAUtrxKmO4k/boSvBisJH6BX01ajpafM7c7f5PO+wAcGYIxiTQsv9ml2/cgnB6MWG/YYKDCfbWLNbpvQxYlUCu0fbRHc4dYM3AysBpx/SE9JNAlUoRsuQ05PP3U0IsM9FzYUpyZ9TDR7bjPYyQIDAQABAoGABnnAXS3mFb36/FA+dBC7AdapQVL1IJMPFFXyGN4eqTlur08zRR5hcqHawjIfqyA97d/zsM6fHz70dKftHoHQ/hZKfWsBr2+R8C7rY/tlJhM24kqusDvNA9AMNoQWK4+DF+J05q5a+VWjP07Y976LZjq+vXlEVBfEiHig4wECaDECQQDbRQ5L9Mcibd5aR+Y3LxtXu0agpSG1dYDcWlLzRAt6yDD/EziRV8DSFyvgj1amO0SQ+2K/Hp5BEHiifDJB48ZFAkEAqFv32dNZcBy4IKAAHPgxhsYBcuUCHGfwwxxXJ3DjjZlhuR4K9YjO0alf4zNOlUyoULe9z+OAIgIqI9EyIX2itQJAShMeLVLYIy1yvJUllOb5Gb5Osd6XcLHtgoORGlWWezg+NS3NImy+2zqwvAAwiZ/kHgaO6XnyhJCH8Hx8jf3g8QJAepLKtlo7iXY/T/FtY6oHVNof/+hfSxMZpNOjWGHGKjd7gG0xCWZbPSYVW7LlCanP+URs+0fk592vlHggCWYQ6QJANZzno1FwUOjtGLeKm83ZGdbo3K+00i25FmBgB2d0uAtknoxFVOjsY+eSXHZqNybrhWRAzutSnpz/QEf/7Vg97g==',
        ) as JwtPayload;
        const user = await this.userService.getUser(decoded_request_token.id);
        request.user = user;
        return true;
      }
    }

    throw new HttpException('Not Authorized To this Route', 403);
  }
}
