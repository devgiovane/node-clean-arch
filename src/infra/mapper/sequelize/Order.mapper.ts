import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CustomerMapper } from "./Customer.mapper";
import { OrderItemMapper } from "./OrderItem.mapper";

@Table({
	tableName: "order",
	timestamps: false
})
export class OrderMapper extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@ForeignKey(() => CustomerMapper)
	@Column({ allowNull: false })
	declare customerId: string;

	@BelongsTo(() => CustomerMapper)
	declare customer: CustomerMapper;

	@HasMany(() => OrderItemMapper)
	declare items: Array<OrderItemMapper>;

	@Column({ allowNull: false })
	declare total: number;
}
