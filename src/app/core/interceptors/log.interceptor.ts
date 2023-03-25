import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const dt = Date.now();
        return next.handle().pipe(tap(() => {
            const req = context.switchToHttp().getRequest();
            console.log(`URL: ${req.url}`);
            console.log(`METHOD: ${req.method}`);
            console.log(`BODY: ${JSON.stringify(req.body)}`);
            console.log(`Duration: ${ Date.now() - dt } ms`);
        }));
    }

}