// // admin.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Assuming you have a user object in your request

//     // Check if the user is an administrator
//     return user && user.role === 'ADMIN';
//   }
// }
