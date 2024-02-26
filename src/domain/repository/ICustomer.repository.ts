import { IRepository } from "./IRepository";
import { Customer } from "../entity/Customer.entity";

export interface ICustomerRepository extends IRepository<Customer> {

}
