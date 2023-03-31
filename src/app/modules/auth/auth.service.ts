import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/app/core/prisma/prisma.service";
import { UserService } from "../user/user.service";
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {

    private issuer: string = 'login';
    private audience: string = 'users';

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) {}

    createToken(user: User){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: "7d",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,
            }),
        };
    }

    checkToken(token: string){
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer,
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email, 
                password,
            }
        });

        if(!user){
            throw new UnauthorizedException('Email/Password incorrect.');
        }

        return this.createToken(user);

    }
    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email, 
            }
        });

        if(!user){
            throw new UnauthorizedException('Email incorrect.');
        }

        // TODO: send e-mail...

        return true;

    }

    async reset(password: string, token: string){
        // TODO: validar token

        const id = 0;

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        });

        return this.createToken(user);
    }
    
    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
    
}