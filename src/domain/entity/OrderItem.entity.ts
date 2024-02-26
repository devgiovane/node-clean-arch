export class OrderItem {

	constructor(
		private id: string,
		private name: string,
		private price: number,
		private quantity: number,
		private productId: string
	) {
		this.validate();
	}

	private validate(): void {
		if (this.quantity <= 0) {
			throw new Error('quantity invalid');
		}
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getPrice(): number {
		return this.price;
	}

	public getQuantity(): number {
		return this.quantity;
	}

	public getProductId(): string {
		return this.productId;
	}

	public getTotalPrice(): number {
		return this.quantity * this.price;
	}
}
