import * as uuid  from "uuid";

import { Order } from "../entity/Order.entity";
import { Customer } from "../entity/Customer.entity";
import { OrderItem } from "../entity/OrderItem.entity";

export class OrderService {

	public static total(orders: Array<Order>): number {
		return orders.reduce((total, order) => total + order.sumTotal(), 0);
	}

	public static placeOrder(customer: Customer, items: Array<OrderItem>): Order {
		if (items.length === 0) {
			throw new Error('items is not empty');
		}
		const order = new Order(uuid.v4(), customer.getId(), items);
		customer.setRewards(order.getTotal() / 2);
		return order;
	}

}
