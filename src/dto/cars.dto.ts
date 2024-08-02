import { MinLength, IsNumber } from "class-validator";

export class CarDTO{

    @MinLength(5, {message: 'Nhap it nhat 5 ky tu'})
    productName?: string;
    
    @IsNumber()
    price?: number;

    @IsNumber()
    categoryId?: number;

};