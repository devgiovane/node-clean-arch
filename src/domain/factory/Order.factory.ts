import * as uuid  from "uuid";

import { Order } from "~@Domain/entity/Order.entity";
import { OrderItem } from "~@Domain/entity/OrderItem.entity";

type OrderItemCreate = {
	name: string,
	price: number,
	quantity: number,
	productId: string
}

type OrderCreate = {
 	customerId: string,
	items: Array<OrderItemCreate>
}

export class OrderFactory {

	public static create({ customerId, items } : OrderCreate): Order {
		const orderItems: Array<OrderItem> = [];
		items.forEach(function (item) {
			orderItems.push(new OrderItem(uuid.v4(), item.name, item.price, item.quantity, item.productId));
		})
		return new Order(uuid.v4(), customerId, orderItems);
	}

}
