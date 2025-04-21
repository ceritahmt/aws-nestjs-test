import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { ApiResponse } from '../../../common/dto/api-response.dto';

export class UserUpdateResponseDto extends OmitType(
  ApiResponse<Omit<User, 'password'>>,
  [] as const,
) {}
