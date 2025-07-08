import { Module } from "@nestjs/common";
import { UsersController } from "./user.Controller";
import { UserService } from "./user.Service";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    imports: [PrismaModule],
    controllers:[UsersController],
    providers:[UserService]
})
export class UserModule {}