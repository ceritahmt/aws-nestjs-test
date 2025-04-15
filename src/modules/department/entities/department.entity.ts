import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Department {
  @ApiProperty({
    example: 1,
    description: 'Department ID',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'Department Code',
    description: 'Department code',
    required: true,
  })
  code: string;

  @Column()
  @ApiProperty({
    example: 'Department Name',
    description: 'Department name',
    required: true,
  })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Department Email',
    description: 'Department email',
    required: true,
    nullable: true,
  })
  email: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;
  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  delete_at: Date;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
