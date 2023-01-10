import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction ){
        let protocol = req.protocol; //http or https
        let host = req.get("host");  // localhost
        let url = req.originalUrl;  //users 
        let method = req.method; //will get the type of method hit by the client
        let date = new Date().toDateString();

        console.log(protocol + "://" + host + url + "  " + method + "  " + date);
        next();
    }
    

}