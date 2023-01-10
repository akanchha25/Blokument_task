import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { GetUser } from "src/user/get-user.decorator";
import { ItemDto } from "./item.dto";
import { ItemService } from "./item.service";

@Controller('/users/items')
export class ItemController {
    constructor(
        private  itemService: ItemService
    ){}

    @Post('/additems')
     addItems(
        @GetUser() user,
        @Body(ValidationPipe) itemDto: ItemDto): Promise<any>{
       return  this.itemService.addItems(user, itemDto);
    }
}