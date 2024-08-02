import { MinLength, IsString } from "class-validator";

export class CategoryDTO{

    @MinLength(5, {message: 'Nhap it nhat 5 ky tu'})
    categoryName?: string;
    
    @IsString()
    description?: string;
};