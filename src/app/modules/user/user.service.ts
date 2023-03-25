import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';

@Injectable()
export class UserService{
    constructor(private readonly prisma: PrismaService){

    }

    async create (data: CreateUserDto){
        return this.prisma.user.create({
            data,
        });
    }

    async list (){
        return this.prisma.user.findMany({
            orderBy: {
                id: Prisma.SortOrder.asc,
            },
        });
    }

    async show(id: number){
        await this.exists(id);
        return this.prisma.user.findUnique({
            where: {
                id,
            }
        });
    }

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDto){
        await this.exists(id);
        
        const updatedAt = new Date();
        return this.prisma.user.update({
            data: {name, email, password, birthAt: birthAt ? new Date(birthAt) : null, updatedAt},
            where: {
                id
            },
        });
    }
    
    async updatePartial(id: number, {name, email, password, birthAt}: UpdatePatchUserDto){

        await this.exists(id);
        
        const data: any = {};

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if(name){
            data.name = name;
        }
        if(email){
            data.email = email;
        }
        if(password){
            data.password = password;
        }

        data.updatedAt = new Date();

        return this.prisma.user.update({
            data,
            where: {
                id
            },
        });
    }

    async delete(id: number){

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists (id: number) {
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException("User not found!"); 
        }
    }
    
}