import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/app/core/prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: `7LR@B!5}=%!dUey(4Q=fw'+/Sr,4H{cK`,
        }),
        UserModule,
        PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {

}