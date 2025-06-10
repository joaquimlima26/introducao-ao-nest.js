import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    // Banco de dados fake (array em memória)
    private users = [
        { id: 1, name: 'joão', email: 'joão@gmail.com' },
        { id: 2, name: 'mel', email: 'mel2gmail.com' }
    ]

    // faça um método que retorne todos os 
    // usùarios do banco de dados fake: findAll

    findAll(): { id: number, name: string, email: string }[] {
        return this.users
    }

    // buscar usuario por id

    findOne(id: number): { id: number, name: string, email: string } | undefined {

        const foundUser = this.users.find((u) => u.id === id)
        return foundUser
    }

    //cria novo usuario

    create(user: { name: string, email: string }): string {

        const newUser = {
            id: this.users.length + 1,
            name: user.name,
            email: user.email
        }
        this.users.push(newUser)

        return `Usuario: ${newUser.name},
                criado com o Id: ${newUser.id}`
    }


}
