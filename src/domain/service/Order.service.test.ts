import { Order } from "../entity/Order.entity";
import { Customer } from "../entity/Customer.entity";
import { OrderItem } from "../entity/OrderItem.entity";
import { OrderService } from "./Order.service";

describe('Order service', function() {

	it('should be able get total of all orders', function () {
		const items = [
			new OrderItem("1", "Item 1", 100, 1, "1"),
			new OrderItem("2", "Item 2", 200, 2, "1")
		];
		const orders = [
			new Order("1", "1", items),
			new Order("2", "2", items)
		];
		const total = OrderService.total(orders);
		expect(total).toEqual(1000);
	});

	it('should be able place an order', function () {
		const customer = new Customer("1", "Customer 1");
		const items = [
			new OrderItem("1", "Item 1", 10, 1, "1"),
			new OrderItem("2", "Item 2", 10, 1, "2")
		];
		const order = OrderService.placeOrder(customer, items);
		expect(customer.getRewards()).toEqual(10);
		expect(order.getTotal()).toEqual(20);
	});

});
