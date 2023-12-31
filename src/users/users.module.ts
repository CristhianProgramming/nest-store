import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/utils/prisma-service.service';
import { UtilsService } from 'src/utils/utils.service';
import { UsersMiddleware } from './middleware/authenticated/users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UtilsService],
  exports: [UsersService],
})
export class UsersModule {}
