import { Order } from "./Order.entity";
import { OrderItem } from "./OrderItem.entity";

describe('Order Entity', function () {

	it('should be able error when id is empty', function () {
		expect(function () {
			new Order("", "1", [])
		}).toThrowError();
	});

	it('should be able error when items is empty', function () {
		expect(function () {
			new Order("1", "1", []);
		}).toThrowError();
	});

	it('should be able calculate total', function () {
		const items = [
			new OrderItem("1", "Item 1", 10, 2, "1"),
			new OrderItem("2", "Item 2", 20, 2, "2")
		];
		const order = new Order("1", "Order 1", items);
		expect(order.getTotal()).toEqual(60);
	});

	it('should be able error when item less than zero', function () {
		expect(function () {
			new OrderItem("1", "Item 1", 10, 0, "1")
		}).toThrowError();
	});

});
