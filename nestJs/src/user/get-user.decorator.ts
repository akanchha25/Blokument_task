import { createParamDecorator } from "@nestjs/common";
import { User } from "./entities/user.entity";

export const GetUser =  createParamDecorator(( data, req ): User => {
   // console.log(req.user);
    //console.log(req.args[0].user);
    
    return  req.args[0].user;
});

 