import { OrderFactory } from "~@Domain/factory/Order.factory";
import {or} from "sequelize";

describe('Order Factory', function () {

	it('should be able a make order', function () {
		const orderProps = {
			customerId: "1",
			items: [{
				name: "Item 1",
				price: 10.0,
				quantity: 2,
				productId: "1"
			}]
		}
		const order = OrderFactory.create(orderProps);
		expect(order.getId()).toBeDefined();
		expect(order.getItems()).toBeDefined();
		expect(order.getItems().at(0).getId()).toBeDefined();
		expect(order.getItems().at(0).getName()).toEqual(orderProps.items.at(0).name);
	});

});
