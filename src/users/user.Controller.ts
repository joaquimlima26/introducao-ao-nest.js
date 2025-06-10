import { Controller, Get, Param, Body, Post} from '@nestjs/common'
import { UserService } from './user.Service'

@Controller('/User')
export class UsersController {
    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }


    @Get()
    findAllUsers() {
        return this.userService.findAll()
    }

    @Get(":id")
    findOneUser( @Param("id") id: string){
        return this.userService.findOne(parseInt(id))
    }

    @Post()
    createUser( @Body() user: { name: string, email: string}){
        return this.userService.create(user)
    }

}