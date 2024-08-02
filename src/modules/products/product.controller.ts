import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { ProductDTO } from "src/dto/product.dto";

@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductService){

    }
    @Get()
    getProducts(): ResponseData<Product[]>{
        try {
            return new ResponseData<Product[]>(this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<Product[]>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
        }
        
    }

    @Post()
    createProduct(@Body( new ValidationPipe()) productDto:ProductDTO): ResponseData<ProductDTO>{
        try {
            return new ResponseData<Product>(this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
        }
    }   

    @Get('/:id')
    detail(@Param('id') id:number): ResponseData<Product>{
        try {
            return new ResponseData<Product>(this.productService.detail(id), HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
        }
    }  

    @Put('/:id')
    updateProduct(@Body() productDto:ProductDTO, @Param('id') id:number): ResponseData<Product>{
        try {
            return new ResponseData<Product>(this.productService.updateProduct(productDto, id), HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
        }
    } 

    @Delete('/:id')
    deleteProduct(@Param('id') id: number): ResponseData<boolean>{
        try {
            return new ResponseData<boolean>(this.productService.deleteProduct(id), HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
        }
    } 
}