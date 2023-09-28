// import { Test } from '@nestjs/testing';
// import { authService } from './auth.service';
// import { UsersService } from '../users.service';
// import { UserEntity } from '../Entity/users.entity';
// import { createUserDTO } from '../DTO/create.user.dto';

// describe('autService', () => {
//   let service: authService;
//   let fakeUserService;

//   beforeEach(async () => {
//     //   creating fake usersService
//     fakeUserService = {
//       getAllUsers: () => Promise.resolve([]),
//       getUserByEmail: () => Promise.resolve(),
//       createUser: (email: string, password: string) =>
//         Promise.resolve({ id: 1, email, password }),
//     };
//     const module = await Test.createTestingModule({
//       providers: [
//         authService,
//         {
//           provide: UsersService,
//           useValue: fakeUserService,
//         },
//       ],
//     }).compile();

//     service = module.get(authService);
//   });

//   it('can create instance of auth service', async () => {
//     expect(service).toBeDefined();
//   });

//   it('creates new user with salted and hashed password', async () => {
//     const user = await service.signUp({
//       Username: 'Xynleap',
//       email: 'gggg@gmail.com',
//       password: 'asdasdasdasd',
//       age: 18,
//       weight: 145,
//       height: 186,
//       gender: 'MALE',
//     } as createUserDTO);

//     if (user instanceof UserEntity) {
//       expect(user.password).not.toEqual('asdasdasdasd');
//       const [salt, hash] = user.password.split('/');
//       expect(salt).toBeDefined();
//       expect(hash).toBeDefined();
//     }
//   });

//   it('thorws an error if user signed up with email that alredy exists', async (done) => {
//     jest.setTimeout(100000);

//     fakeUserService.find = () =>
//       Promise.resolve([
//         {
//           id: 1,
//           email: 'aaaa',
//           password: 'adasdasda',
//         },
//       ]);
//     try {
//       await service.signUp({
//         email: 'gio-aadaaadaa@bk.ru',
//         password: 'assda',
//       } as UserEntity);
//     } catch (error) {
//       done();
//     }
//   });
// });
