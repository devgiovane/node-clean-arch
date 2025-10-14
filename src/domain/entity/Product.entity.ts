import { Entity } from "./Entity";
import { IProduct } from "./IProduct";
import { IValidator } from "~@Domain/validator/IValidator";
import {DomainError} from "~@Domain/errors/Domain.error";

export class Product extends Entity implements IProduct {

	constructor(
		private id: string,
		private name: string,
		private price: number
	) {
		super();
	}

	public validate(validator: IValidator<Product>): void {
		validator.validate(this);
		this.verify();
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public changeName(name: string): void {
		this.name = name;
	}

	public getPrice(): number {
		return this.price;
	}

	public changePrice(price: number): void {
		this.price = price;
	}

	private verify(): void {
		if (this.notification.hasErrors()) {
			throw new DomainError(this.notification.messages());
		}
	}

	public toJSON(): object {
		return {
			id: this.getId(),
			name: this.getName(),
			price: this.getPrice()
		}
	}

}
