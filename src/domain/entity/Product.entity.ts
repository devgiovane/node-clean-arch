import { IProduct } from "~@Domain/entity/IProduct";

export class Product implements IProduct {

	constructor(
		private id: string,
		private name: string,
		private price: number
	) {
		this.validate();
	}

	private validate(): void {
		if (this.id.length === 0) {
			throw new Error("id is required");
		}
		if (this.name.length === 0) {
			throw new Error("name is required");
		}
		if (this.price <= 0) {
			throw new Error("price less than zero");
		}
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public changeName(name: string): void {
		this.name = name;
		this.validate();
	}

	public getPrice(): number {
		return this.price;
	}

	public changePrice(price: number): void {
		this.price = price;
		this.validate();
	}

	public toJSON(): object {
		return {
			id: this.getId(),
			name: this.getName(),
			price: this.getPrice()
		}
	}

}
