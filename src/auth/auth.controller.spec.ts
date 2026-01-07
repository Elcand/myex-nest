import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUsersService: Partial<UsersService> = {};
  let fakeAuthService: Partial<AuthService> = {};

  beforeEach(async () => {
    fakeUsersService = {};
    fakeAuthService = {
      login: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return  s user login', async () => {
    const session = {};
    const user = await controller.login({ id: 1, email: 'j@j.com', password: 'password' }, session);

    expect(user).toEqual({ id: 1, email: 'j@j.com', password: 'password' });
    expect(session.userId).toEqual(1);
  });
});
