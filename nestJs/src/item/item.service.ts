import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { ItemDto } from "./item.dto";
import { Items } from "./item.entity";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Items)
        private readonly itemRepository: Repository<Items>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>


    ){}

    async addItems( user: User, itemDto:ItemDto): Promise<any> {
        const{item_name, price, quantity } = itemDto;

    //    const addedByUser = await this.userRepository.findOne({
    //         where:{
    //             email_id: user.email_id
    //         }
    //     }) 

        const item: Items = new Items();
        item.item_name = item_name;
        item.price = price;
        item.quantity = quantity;
        item.addedBy = user.id;
        
        try {
            await this.itemRepository.save(item);

            return {message: "Item added successfully"};
        } catch(error){
            console.log(error);
        }
    }
}