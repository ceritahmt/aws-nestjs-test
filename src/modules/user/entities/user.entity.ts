import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/modules/department/entities/department.entity';
import { Title } from 'src/modules/title/entities/title.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: 'User ID',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'JHONDOE',
    description: 'User code for third-party',
    nullable: true,
  })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    nullable: false,
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'EMAIL',
    description: 'User email',
    nullable: false,
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'JOHN',
    description: 'User username',
    nullable: false,
  })
  @Column()
  username: string;

  @Column()
  password: string;

  @ApiProperty({
    example: '0123456789',
    description: 'User phone',
    nullable: true,
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: 'en',
    description: 'Language',
    nullable: false,
  })
  @Column({ default: 'en' })
  lang: string;

  @ApiProperty({
    example: true,
    description: 'is active',
    nullable: false,
  })
  @Column({ default: true })
  status: boolean;

  @ApiProperty({
    example: '1990-01-01',
    description: 'create_at',
    nullable: false,
  })
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @ApiProperty({
    example: '1990-01-01',
    description: 'update_at',
    nullable: false,
  })
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @ApiProperty({
    example: '1990-01-01',
    description: 'delete_at',
    nullable: true,
  })
  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  delete_at: Date;

  @ApiProperty({
    type: () => Department,
    nullable: true,
  })
  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  @ApiProperty({
    type: () => Title,
    nullable: true,
  })
  @OneToOne(() => Title)
  @JoinColumn()
  title: Title;
}
