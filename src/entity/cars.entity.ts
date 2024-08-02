import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriesEntity } from "./categories.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    categoryId: number;

    @Column()
    price: number;

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn( {name: 'categoryId',referencedColumnName: 'id'} )
    category: CategoriesEntity;
}