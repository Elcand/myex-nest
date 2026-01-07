import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      findAll: (email: string) => {
        const user = users.find((user) => user.email === email);
        return Promise.resolve([user]);
      },
      create: (name: string, email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          name,
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await service.register('Jhon Doe', 'j@j.com', 'password');

    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should fail to create a user with an existing email', async () => {
    fakeUserService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'j@j.com',
          password: 'password',
        } as User,
      ]);
    };
    await expect(
      service.register('John Doe', 'j@j.com', 'password'),
    ).rejects.toThrow('User already exists');
  });

  it('throws if user login with invalid email', async () => {
    await expect(
      service.login('admin@example.com', 'password'),
    ).rejects.toThrow('User not found');
  });

  it('shuold fail if user login with invalid password', async () => {
    fakeUserService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'j@j.com',
          password: 'password',
        } as User,
      ]);
    };
    await expect(service.login('j@j.com', 'wrong-password')).rejects.toThrow(
      'Bad credentials',
    );
  });

  it('should login exising user', async () => {
    fakeUserService.findAll = () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'John Doe',
          email: 'j@j.com',
          password:
            '1361afbf50652909.95c08174590fdbca6f3e0cca4a6dc32edeeacc72231c40dcdc3bc781145cb449',
        } as User,
      ]);
    };
    const user = await service.login('j@j.com', 'password');
    expect(user).toBeDefined();
  });
});
