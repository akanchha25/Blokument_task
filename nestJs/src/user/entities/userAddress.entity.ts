import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity ()
export class Users_address extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ referencedColumnName: "email_id" })
    user_: User;


    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    pincode: number;
}