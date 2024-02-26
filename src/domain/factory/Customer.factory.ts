import * as uuid  from "uuid";

import { ICustomer } from "~@Domain/entity/ICustomer";
import { Customer } from "~@Domain/entity/Customer.entity";
import { Address } from "~@Domain/entity/Address.entity";

export class CustomerFactory {

	public static create(name: string): ICustomer {
		return new Customer(uuid.v4(), name);
	}

	static createWithAddress(name: string, address: Address) {
		const customer = new Customer(uuid.v4(), name);
		customer.setAddress(address);
		return customer;
	}
}
