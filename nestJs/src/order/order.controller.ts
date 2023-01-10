import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetUser } from "src/user/get-user.decorator";
import { CreateOrderDto } from "./order.dto";
import { OrderServices } from "./order.service";

@Controller('users/order')
export class OrderController {
    constructor(
        private readonly orderServices: OrderServices
    ){}

    @Post('/placeOrder')
    userOrder(
        @GetUser()user,
        @Body() createOrderDto: CreateOrderDto

    ): Promise<any> {
        return this.orderServices.createOrder(user, createOrderDto);

    }


    @Get('/myOrder')
    myOrder(@GetUser() user): Promise<any> {
        return this.orderServices.myOrder(user);
    }
    
}