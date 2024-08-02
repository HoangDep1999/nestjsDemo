import { Injectable } from "@nestjs/common";
import { ProductDTO } from "src/dto/product.dto";
import { Product } from "src/models/product.model";

@Injectable()
export class ProductService{

    private products:Product[] = [
        {id:1, categoryID: 2, price:80000, productName:"Keyboard"},
        {id:2, categoryID: 3, price:686868, productName:"Hoang dep"}
    
    ]
        
    getProducts(): Product[]{
        return this.products;
    }

    createProduct(productDto: ProductDTO): Product{
        const product: Product = {
            id: Math.random(),
            ...productDto
        }
        this.products.push(product)
        return product;
    }

    detail(id: number): Product{
        return this.products.find(item => item.id === Number(id) )
    }

    updateProduct(productDto: ProductDTO, id: number): Product{
        const index = this.products.findIndex(item => item.id === Number(id));
        this.products[index].categoryID = productDto.categoryID;
        this.products[index].productName = productDto.productName;
        this.products[index].price = productDto.price;

        return this.products[index];
    }

    deleteProduct(id:number): boolean{
        const index = this.products.findIndex(item => item.id === Number(id));
        if(index != -1){
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}