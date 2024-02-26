import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductMapper } from "./Product.mapper";
import { OrderMapper } from "./Order.mapper";

@Table({
	tableName: "order_item",
	timestamps: false
})
export class OrderItemMapper extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@ForeignKey(() => ProductMapper)
	@Column({ allowNull: false })
	declare productId: string;

	@BelongsTo(() => ProductMapper)
	declare customer: ProductMapper;

	@ForeignKey(() => OrderMapper)
	@Column({ allowNull: false })
	declare orderId: string;

	@BelongsTo(() => OrderMapper)
	declare order: OrderMapper;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare quantity: number;

	@Column({ allowNull: false })
	declare price: number;
}
