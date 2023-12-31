import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly serviceUser: UsersService) { }

    @Get()
    getUsuarios() {
        return this.serviceUser.findAll()
    }

    @Get(':id')
    getUsuario(@Param('id') id: number) {
        return this.serviceUser.findUser(id)
    }

    @Post()
    createUser(@Body() payload: UserDto) {
        return this.serviceUser.createUser(payload);
    }

}
