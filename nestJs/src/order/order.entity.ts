import { Items } from "src/item/item.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class orders extends BaseEntity {

    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    item_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;


    @OneToOne(() => User)
    @JoinColumn()  
    user: User;


    @OneToOne(() => Items)
    @JoinColumn()
    item: Items;










}