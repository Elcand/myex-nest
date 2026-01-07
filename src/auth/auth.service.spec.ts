import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      findAll: () => Promise.resolve([]),
      create: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password } as User);
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
          email: 'hv3RU@example.com',
          password: 'password',
        } as User,
      ]);
    };
    await expect(
      service.register('John Doe', 'hv3RU@example.com', 'password'),
    ).rejects.toThrow('User already exists');
  });

  it('throws if user login with invalid credentials', async () => {
    await expect(
      service.login('admin@example.com', 'password'),
    ).rejects.toThrow('User not found');
  });
});
