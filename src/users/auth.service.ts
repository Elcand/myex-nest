import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(name: string, email: string, password: string) {
    // check if any user has the same email
    const users = await this.usersService.findAll(email);
    if (users.length) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    // cerate user
    const user = await this.usersService.create(name, email, hashedPassword);

    return user;
  }
}
