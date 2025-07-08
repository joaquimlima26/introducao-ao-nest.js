import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/auth/admin.guard";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { TuristaGuard } from "src/auth/turista.guard";
import { UserService } from "./user.Service";
import { RegisterDto } from "src/auth/dto/register.dto";

@ApiTags('users') 
@UseGuards(JwtAuthGuard) // Protege todas as rotas deste controller com JWT
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiBody({ type: RegisterDto })
  @ApiBearerAuth() // Protege esta rota com autenticação JWT na documentação Swagger
  @UseGuards(AdminGuard) // Apenas usuários com papel de ADMIN podem criar novos usuários
  create(@Body() data: RegisterDto) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @ApiBearerAuth()
  @UseGuards(TuristaGuard) // Permite acesso a usuários com papel de TURISTA
  findAll() {
    return this.usersService.findAll();
  }
}