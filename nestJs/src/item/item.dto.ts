import {  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ItemDto {
    
    @IsNotEmpty()
    @IsString()
    item_name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsNotEmpty()
    @IsNumber()
    quantity:number;

}