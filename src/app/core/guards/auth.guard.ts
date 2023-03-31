import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authService: AuthService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest().headers;
        try {
            const data =this.authService.checkToken((request.authorization ?? "").split(" ")[1]);
            request.tokenPayload = data;
            return true;
        } catch (error) {
            return false;
        }
    }

}