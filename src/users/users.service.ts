import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma-service.service';
import { UserDto } from './models/user.dto';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService, private utils: UtilsService) { }

    async findAll() {
        const usuarios = ((await this.prisma.users.findMany({ include: { role: true } })))
        return usuarios;
    }

    async findUser(id: number) {
        const userFound = await this.prisma.users.findFirst({
            where: { id_user: Number(id) }, include: { role: true }
        });
        if (!userFound) return { 'message': 'Usuario no encontrado' }
        return userFound;
    }

    async createUser(body: UserDto) {
        const roleList = []
        const foundUser = await this.prisma.users.findFirst({
            where: {
                email: body.email
            }
        })

        if (foundUser)
            return new HttpException('user credential are in use', HttpStatus.CONFLICT);

        body.role.map(role => roleList.push({ "name": role }))
        const newUser = await this.prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
                password: this.utils.encryptPassword(body.password),
                role: {
                    create: roleList
                }
            },
        });
        return newUser;
    }



}
