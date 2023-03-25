import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {

        console.log("UserIdCheckMiddleware", 0);

        if(isNaN(Number(req.params.id)) || Number(req.params.id) <= 0 ){
            throw new BadRequestException('id invalid'); 
        }

        console.log("UserIdCheckMiddleware", 1);

        next();
    }

}