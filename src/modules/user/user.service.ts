import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isNumberString } from 'class-validator';
import { TitleService } from '../title/title.service';
import { DepartmentService } from '../department/department.service';
import { hashPassword } from '../../common/hash.password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly titleService: TitleService,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { code: createUserDto.code },
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }
    if (createUserDto.status !== false) {
      createUserDto.status = true;
    }
    if (createUserDto.lang === null) {
      createUserDto.lang = 'en';
    }

    const title = await this.titleService.findOne(createUserDto.titleCode);
    const department = await this.departmentService.findOne(
      createUserDto.departmentCode,
    );

    const hashedPassword = await hashPassword(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      title: title,
      department: department,
    });
    const savedUser = await this.userRepository.save(user);
    return await this.findOne(savedUser.id.toString());
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find({
      relations: {
        title: true,
        department: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...rest }) => ({ ...rest }));
  }

  async findOne(idOrCode: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : -1 },
        { code: idOrCode },
      ],
      relations: {
        title: true,
        department: true,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }
  async findOneByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });
    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async update(
    idOrCode: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : -1 },
        { code: idOrCode },
      ],
    });
    if (!user) throw new BadRequestException('User not found');

    const updateUser = this.userRepository.create({ ...updateUserDto });

    if (updateUserDto.titleCode) {
      const title = await this.titleService.findOne(updateUserDto.titleCode);
      updateUser.title = title;
    }
    if (updateUserDto.departmentCode) {
      const department = await this.departmentService.findOne(
        updateUserDto.departmentCode,
      );
      updateUser.department = department;
    }

    const result = await this.userRepository.update(user.id, updateUser);

    if (result.affected === 0) {
      throw new BadRequestException('Failed to update user');
    }
    const updatedUser = await this.findOne(user.id.toString());
    if (!updatedUser) throw new BadRequestException('Updated user not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return updatedUser;
  }

  async remove(idOrCode: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: [
        { id: isNumberString(idOrCode) ? parseInt(idOrCode) : -1 },
        { code: idOrCode },
      ],
    });
    if (!user) throw new BadRequestException('User not found');

    await this.userRepository.delete(user.id);

    return { message: 'User deleted successfully' };
  }
}
