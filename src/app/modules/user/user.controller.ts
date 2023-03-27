import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { ParamId } from "src/app/core/decorators/param-id.decorator";
import { LogInterceptor } from "src/app/core/interceptors/log.interceptor";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}
    
    @Post()
    async create(@Body() data : CreateUserDto) {
        return this.userService.create(data);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number){
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data : UpdatePutUserDto, @ParamId() id: number){
        return this.userService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data : UpdatePatchUserDto, @ParamId() id: number){
        return this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number){
        return this.userService.delete(id);
    }
    
}
