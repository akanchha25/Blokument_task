import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateOrderDto {

    
    @IsNotEmpty()
    @IsNumber()
    item_Id:number;

    
    @IsNotEmpty()
    @IsNumber()
    quantity:number;


}