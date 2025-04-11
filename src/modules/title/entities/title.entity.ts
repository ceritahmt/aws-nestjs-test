import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Title {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @Column()
    name: string;
   
    @CreateDateColumn({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;
    @UpdateDateColumn({ name: 'update_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
    @DeleteDateColumn ({ name: 'delete_at', type: 'timestamp' })
    delete_at: Date;
}
