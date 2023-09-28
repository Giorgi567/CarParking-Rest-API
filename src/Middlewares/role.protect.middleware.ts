// role-based.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from 'src/Entity/users.entity';

@Injectable()
export class RoleProtectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    console.log(user, 'BRRS');

    if (user.Role === 'ADMIN') {
      next();
    }

    if (user.Role === 'USER') {
      console.log(`ins`);
      res.status(403).json({ message: 'Access denied. Only admins allowed.' });
    }
  }
}
