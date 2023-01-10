import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Items } from "src/item/item.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./order.dto";
import { orders } from "./order.entity";

@Injectable()
export class OrderServices {

    constructor(
        @InjectRepository(orders)
        private readonly orderRepository: Repository<orders>,

        @InjectRepository(Items)
        private readonly itemsRepository: Repository<Items>
    ){}



    async createOrder(user, createOrderDto: CreateOrderDto): Promise<any>{

        const items = await this.itemsRepository.findOne({
            where: {
                item_id: createOrderDto.item_Id
            }
        })

        const{ item_Id, quantity } = createOrderDto;

        const order = new orders();

        order.item = items;
        order.item_name = items.item_name;
        order.quantity = quantity;
        order.price = items.price;
        order.user = user.id;

        await this.orderRepository.save(order);


    }


    async myOrder(user): Promise<any> {
        const myOrder = this.orderRepository.find({
            where: {
                user: user.id
            }
        })

        return myOrder;
    }
}