import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class ProductDTO{
    @IsNotEmpty({message: 'ID khong dc trong'})
    categoryID?: number;

    @MinLength(5, {message: 'Nhap it nhat 5 ky tu'})
    productName?: string;
    
    @IsNumber()
    price?: number;
};