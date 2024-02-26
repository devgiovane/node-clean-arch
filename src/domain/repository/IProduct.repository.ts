import { IRepository } from "./IRepository";
import { Product } from "../entity/Product.entity";

export interface IProductRepository extends IRepository<Product> {

}
