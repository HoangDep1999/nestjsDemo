import { Category } from "src/models/category.model";
import { AbstractPromise } from "./AbstractRepository";

export interface ICategoryRepository extends AbstractPromise<Category>{
   
}