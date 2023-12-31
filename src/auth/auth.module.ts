import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/utils/prisma-service.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  providers: [AuthService, PrismaService, UtilsService],
  controllers: [AuthController],
})
export class AuthModule {}
