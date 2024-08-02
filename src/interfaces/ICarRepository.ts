import { Car } from "src/models/Car.model";
import { AbstractPromise } from "./AbstractRepository";

export interface ICarRepository extends AbstractPromise<Car>{
    findRelationById(id: number): Promise<Car>;
}