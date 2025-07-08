import { Controller, Get, Param, Body, Post, ParseIntPipe, Put, Delete } from '@nestjs/common'
import { UserService } from './user.Service'
import { Prisma, User } from "@prisma/client"
@Controller('users')
export class UsersController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    // Rota Criar Usuario
    @Post()
    create(@Body() data: any) {
        return this.userService.create(data)
    }

    @Get()
    findAllUsers() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    // @Put(':id')
    // async updateUser(
    //     @Param('id', ParseIntPipe) id: string,
    //     @Body() userData: Prisma.UserUpdateInput
    // ): Promise<User> {
    //     return this.userService.update(id, userData);
    // }

    // @Delete(':id')
    // async deleteUser(@Param('id') id: string): Promise<User> {
    //     return this.userService.remove(id);
    // }

}