import { Body, Controller, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthMeDto } from "./dto/auth-me.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){};

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDto){
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDto){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDto){
        return this.authService.reset(password, token);
    }
    
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() req){
        return {data: req.tokenPayload};
    }
}