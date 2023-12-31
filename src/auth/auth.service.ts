import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma-service.service';
import * as jwt from 'jsonwebtoken';
import { UtilsService } from 'src/utils/utils.service';
import { enviroument } from 'env/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async singIp(payload: any) {
    const foundUser = await this.prisma.users.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (!foundUser)
      return new HttpException('user not found', HttpStatus.NOT_FOUND);

    if (payload.password !== this.utils.decryptPassword(foundUser.password))
      return new HttpException('credential invalid', HttpStatus.NOT_ACCEPTABLE);

    return {
      bearer: jwt.sign({ id: foundUser.id_user }, enviroument.SECRET_KEY, {
        expiresIn: 88400,
      }),
    };
  }

  async singUp(payload: any) {
    const foundUser = await this.prisma.users.findFirst({
      include: {
        role: true,
      },
      where: {
        email: payload.email,
      },
    });

    if (foundUser)
      return new HttpException(
        'user credential are in use',
        HttpStatus.CONFLICT,
      );

    const newUser = await this.prisma.users.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: this.utils.encryptPassword(payload.password),
        role: {
          create: {
            name: 'view',
          },
        },
      },
    });

    return {
      bearer: jwt.sign({ id: newUser.id_user }, enviroument.SECRET_KEY, {
        expiresIn: 88400,
      }),
    };
  }
}
