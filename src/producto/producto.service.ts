import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { type } from 'os';
import { PrismaService } from 'src/utils/prisma-service.service';

@Injectable()
export class ProductoService {

    constructor(private readonly prismaService: PrismaService) { }

    async findAllProducts() {
        return await this.prismaService.producto.findMany({include:{type_poduct:true}})
    }

    async findProducts(id: number) {
        const product = await this.prismaService.producto.findFirst({
            where: {
                id_product: id
            }
        })

        if (!product) return new HttpException('Product not found', HttpStatus.NOT_FOUND)

        return product
    }

    async createProducts(body: any) {
        const { name, image, stock } = body;
        const type_poduct = []
        body.type_poduct.map(type => type_poduct.push({ "name": type }))
        const productExist = await this.prismaService.producto.findFirst({
            where: {
                name: name
            }
        })

        if (productExist) return new HttpException('product is already register', HttpStatus.CONFLICT)

        const newProduct = await this.prismaService.producto.create({
            data: {
                name,
                image,
                stock,
                type_poduct: {
                    create: type_poduct
                }
            }
        })

        return newProduct;
    }

    async updateProducts(id: number, body: any) {
        const { name, image, stock } = body;
        const type_poduct = []
        body.type_poduct.map(type => type_poduct.push({ "name": type }))
        const productExist = await this.prismaService.producto.findFirst({
            where: {
                id_product: id
            }
        })
        if (!productExist) return new HttpException('Product doesnt exist', HttpStatus.NOT_FOUND);

        if (productExist.name !== name) productExist.name = name
        if (productExist.image !== image) productExist.image = image
        if (productExist.stock !== stock) productExist.stock = stock

        const updateProduct = await this.prismaService.producto.update({
            where: {
                id_product: productExist.id_product
            },
            data: {
                ...productExist
            }
        })

        return updateProduct;

    }

    async deleteProducts(id: number) {
        try {
            await this.prismaService.producto.delete({
                where: {
                    id_product: id
                }
            })
            return;
        } catch (error) {
            return new HttpException('cant delete product', HttpStatus.CONFLICT)
        }

    }
}
