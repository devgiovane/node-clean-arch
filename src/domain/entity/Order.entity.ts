import { OrderItem } from "./OrderItem.entity";

export class Order {

	private total: number = 0;

	constructor(
		private id: string,
		private customerId: string,
		private items: Array<OrderItem>
	) {
		this.total = this.sumTotal();
		this.validate();
	}

	private validate(): void {
		if (this.id.length === 0) {
			throw new Error('id is required');
		}
		if (this.items.length === 0) {
			throw new Error('items is required');
		}
	}

	public getId(): string {
		return this.id;
	}

	public getCustomerId(): string {
		return this.customerId;
	}

	public addItem(item: OrderItem): void {
		this.items.push(item);
		this.total = this.sumTotal();
	}

	public getItems(): Array<OrderItem> {
		return this.items;
	}

	public getTotal(): number {
		return this.total;
	}

	public sumTotal(): number {
		return this.items.reduce((total: number, item: OrderItem) => total + item.getTotalPrice(), 0);
	}

	public toJSON(): object {
		return {
			id: this.getId(),
			customerId: this.getCustomerId(),
			total: this.getTotal(),
			items: this.getItems()
		}
	}
}

