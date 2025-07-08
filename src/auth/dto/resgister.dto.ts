import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({
        description: 'Cria um novo usuário no sistema',
        example: 'João Silva',
        })
    @IsString({ message: 'o nome precisa ser textual' })
    name: string;
    @ApiProperty({
        description: 'Email do usuário utilizado para login',
        example: "Joao@gmail.com"})
    @IsEmail({}, { message: 'O email precisa ser válido' })
    email: string;
    @ApiProperty({
        description: 'Senha utilizada para autenticação do usuário',
        example: 'senha123'})
    @IsString({ message: 'A senha precisar ser textual.' })
    password: string;
}