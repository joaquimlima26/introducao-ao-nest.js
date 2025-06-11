import { Controller, Get, Param, Body, Post} from '@nestjs/common'
import { UserService } from './user.Service'
import { User } from "@prisma/client"
@Controller('users')
export class UsersController {
    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    // Rota Criar Usuario
    @Post()
    create(@Body() data: any){
        return this.userService.create(data)
    }

    // @Get()
    // findAllUsers() {
    //     return this.userService.findAll()
    // }

    // @Get(":id")
    // findOneUser( @Param("id") id: string){
    //     return this.userService.findOne(parseInt(id))
    // }

    // @Post()
    // createUser( @Body() user: { name: string, email: string}){
    //     return this.userService.create(user)
    // }

}