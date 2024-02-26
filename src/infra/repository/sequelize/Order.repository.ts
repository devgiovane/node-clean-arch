import { IOrderRepository } from "~@Domain/repository/IOrder.repository";
import { Order } from "~@Domain/entity/Order.entity";
import { OrderItem } from "~@Domain/entity/OrderItem.entity";
import { OrderMapper } from "../../mapper/sequelize/Order.mapper";
import { OrderItemMapper } from "../../mapper/sequelize/OrderItem.mapper";

export class OrderRepository implements IOrderRepository {

	public async find(id: string): Promise<Order> {
		const response = await OrderMapper.findOne({
			where: { id },
			include: ["items"],
			rejectOnEmpty: true
		});
		const items = [];
		for (const item of response.items) {
			items.push(new OrderItem(item.id, item.name, item.price, item.quantity, item.productId));
		}
		return new Order(response.id, response.customerId, items);
	}

	public async findAll(): Promise<Array<Order>> {
		const orders = await OrderMapper.findAll({
			include: ["items"],
		});
		return orders.map(order => {
			const items = [];
			for (const item of order.items) {
				items.push(new OrderItem(item.id, item.name, item.price, item.quantity, item.productId));
			}
			return new Order(order.id, order.customerId, items);
		});
	}

	public async save(entity: Order): Promise<void> {
		await OrderMapper.create({
			id: entity.getId(),
			customerId: entity.getCustomerId(),
			total: entity.getTotal(),
			items: entity.getItems().map(item => ({
				id: item.getId(),
				name: item.getName(),
				price: item.getPrice(),
				productId: item.getProductId(),
				quantity: item.getQuantity()
			}))
		}, {
			include: [{ model: OrderItemMapper }]
		});
	}

	public async update(entity: Order): Promise<void> {
		const transaction = await OrderMapper.sequelize.transaction();
		entity.getItems().map(async function (item) {
			await OrderItemMapper.upsert({
				id: item.getId(),
				name: item.getName(),
				price: item.getPrice(),
				productId: item.getProductId(),
				quantity: item.getQuantity(),
				orderId: entity.getId()
			}, {
				transaction
			})
		});
		await OrderMapper.update({
			customerId: entity.getCustomerId(),
			total: entity.getTotal(),
		}, {
			where: {
				id: entity.getId()
			},
			transaction
		});
		await transaction.commit();
	}

}
