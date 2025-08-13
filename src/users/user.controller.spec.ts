import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./user.Controller";
import { UserService } from "./user.Service";
import { get } from "http";


const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("User Controller Tests", () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UserService, useValue: mockUserService }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController)
    })

    it("Deve criar um usuario", async () => {
        const dto = { name: "tu", email: "tu@exemple.com", password: "1234" }
        const user = { id: "1", ...dto }

        mockUserService.create.mockResolvedValue(user)

        expect(await controller.create(dto)).toEqual(user)
        expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });

    it("Deve retornar todos os usuários", async () => {
        const users = [
            { name: "tu", email: "tu@exemple.com" },
            { name: "eu", email: "eu@exemple.com" }
        ];

        mockUserService.findAll.mockResolvedValue(users);

        expect(await controller.findAll()).toEqual(users);
        expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
    });

    it("Deve retorna um usuário por ID", async () => {
        const users = { id: "2", name: "eu", email: "eu@exemple.com" }

        mockUserService.findOne.mockResolvedValue(users)

        expect(await controller.findOne("2")).toEqual(users)
        expect(mockUserService.findOne).toHaveBeenCalledWith("2")
    });

    it("Deve Atualizar um usuário pelo ID", async () => {
        const dto = { email: "eu@exemple.com" }
        const user = { id: "1", name: "eu", email: "eu@exemple.com" }

        mockUserService.update.mockResolvedValue(user)

        expect(await controller.update("1", dto)).toEqual(user)
        expect(mockUserService.update).toHaveBeenCalledWith("1", dto)
    })

    it("Deve deletar um usuario pelo ID", async () => {
        const users = { id: "2", name: "eu", email: "eu@exemple.com" }

        mockUserService.remove.mockResolvedValue(users)

        expect(await controller.remove("2")).toEqual(users)
        expect(mockUserService.remove).toHaveBeenCalledWith("2")
    })

})