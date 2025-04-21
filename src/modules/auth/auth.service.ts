import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { JWTPayload } from './type/payload.type';
import { comparePassword } from '../../common/hash.password';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    const isMatch: boolean = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    const { password: pass, ...result } = user;
    return result;
  }

  login(user: User) {
    const payload: JWTPayload = { user: user };
    return { access_token: this.jwtService.sign(payload) };
  }
}
