import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity ()
@Unique(['email_id'])
export class User extends BaseEntity {
    // save() {
    //     throw new Error("Method not implemented.");
    // }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column ({ type: 'varchar' })
    email_id: string;

    @Exclude()
    @Column ({ type: 'varchar' })
    password: string;

    @Column ({ type: 'int' })
    age: number;

    @Column ({ type: 'varchar' })
    city: string

    @Column()
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;

    }



}