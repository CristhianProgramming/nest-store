import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService){}

    @Get()
    getAllProducts() {
        return this.productoService.findAllProducts()
    }

    @Get(':id')
    getProduct(@Param('id',ParseIntPipe) product_id : number) {
        return this.productoService.findProducts(product_id)
    }

    @Post()
    CreateProduct(@Body() payload : any) {
        return this.productoService.createProducts(payload)
    }

    @Put(':id')
    updateProduct(@Param('id',ParseIntPipe) product_id : number,@Body() payload : any) {
        return this.productoService.updateProducts(product_id,payload)
    }

    @Delete(':id')
    deleteProduct(@Param('id',ParseIntPipe) product_id : number) {
        return this.productoService.deleteProducts(product_id)
    }

}
