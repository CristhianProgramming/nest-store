import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { PrismaService } from 'src/utils/prisma-service.service';

@Module({
  providers: [ProductoService, PrismaService],
  controllers: [ProductoController],
})
export class ProductoModule {}
