import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = this.userService.getUser(decoded[0].id);
        console.log(user);
        // You can attach the decoded payload to the request for use in your controllers
        req.user = user;

        // Continue to the next middleware or route handler
        next();
      } catch (error) {
        // Token verification failed, return an error response
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      // No "Bearer" token found in the "Authorization" header
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
