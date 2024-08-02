import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class AccountEnity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    permission: string;
}