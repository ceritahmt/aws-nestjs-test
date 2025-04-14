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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'en' })
  lang: string;

  @Column({ name: 'card_id', nullable: true })
  cardId: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  mainpage: boolean;

  @Column({ default: true })
  sidebar: boolean;

  @Column({ name: 'list_type', default: 1 })
  listType: number;

  @Column({ default: true })
  status: boolean;

  @Column({ default: false })
  headworker: boolean;

  @Column({ nullable: true })
  pin: string;

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

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  @OneToOne(() => Title)
  @JoinColumn()
  title: Title;
}
