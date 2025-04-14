import { User } from 'src/modules/user/entities/user.entity';

export interface JWTPayload {
  user: Omit<User, 'password'>;
}
