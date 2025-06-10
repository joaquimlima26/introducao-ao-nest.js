import { Module } from "@nestjs/common";
import { UsersController } from "../users/user.Controller";
import { UserService } from "./user.Service";

@Module({
    controllers:[UsersController],
    providers:[UserService]
})
export class UserModule{}