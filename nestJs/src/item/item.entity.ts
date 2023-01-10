import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Items extends BaseEntity {

    @PrimaryGeneratedColumn()
    item_id:number;

    @Column()
    item_name:string;

    @Column()
    price:number;

    @Column()
    quantity:number;

    @Column()
    addedBy: number;



}