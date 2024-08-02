export class Car{
    productName?: string;
    price?: number;
    categoryId?: number;

    constructor({productName, price, categoryId}){
        if(productName != undefined) this.productName = productName;
        if(price != undefined) this.price = price;
        if(categoryId != undefined) this.categoryId = categoryId;
    }
}