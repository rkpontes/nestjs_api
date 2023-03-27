import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserIdCheckMiddleware } from "src/app/core/middlewares/user-id-check.middleware";
import { PrismaModule } from "../../core/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL,
        });
    }
}
