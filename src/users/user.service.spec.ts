import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.Service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

// Mock do PrismaService
const mockPrisma = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
};

describe("suit de testes para serviços de usuários ", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks(); // limpa mocks antes de cada teste
  });

  it("deve criar um usuário", async () => {
    const dto = {
      name: "Joaquim",
      email: "joaquim@example.com",
      password: "321"
    };
    mockPrisma.user.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it("deve retornar todos os usuários", async () => {
    const users = [
      { id: 1, name: "Joaquim", email: "joaquim@example.com" },
      { id: 2, name: "Maria", email: "maria@example.com" }
    ];

    mockPrisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockPrisma.user.findMany).toHaveBeenCalled();
  });

  it("deve retornar um usuário pelo ID", async () => {
    const userId = "1"
    const mockUser = { id: "1", name: "tu", email: "tu@example.com" }

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await service.findOne(userId);

    expect(result).toEqual(mockUser);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId }
    });
  });

  it("Atualiza usuarios por ID", async () => {
    const userId = "1"
    const mockUser = { id: "1", name: "tu", email: "tu@example.com" }

    mockPrisma.user.findUnique.mockResolvedValue(userId)
    mockPrisma.user.update.mockResolvedValue(mockUser)

    const result = await service.update(userId, mockUser)
    expect(result).toEqual(mockUser)
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: mockUser
    })
  });

  it("Deve deletar um usuário por ID", async () => {
    const userId = "1"
    const mockUser = { id: "1", name: "tu", email: "tu@example.com" }

    mockPrisma.user.findUnique.mockResolvedValue(userId)
    mockPrisma.user.delete.mockResolvedValue(mockUser)

    const result = await service.remove(userId)
    expect(result).toEqual(mockUser)
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: userId }
    })

  })
});
