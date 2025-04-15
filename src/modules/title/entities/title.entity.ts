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
export class Title {
  @ApiProperty({
    example: 1,
    description: 'Title ID',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Title Code',
    description: 'Title code',
    required: true,
  })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    example: 'Title Name',
    description: 'Title name',
    required: true,
  })
  @Column()
  name: string;

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

  @OneToMany(() => User, (user) => user.title)
  users: User[];
}
