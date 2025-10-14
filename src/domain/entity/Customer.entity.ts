import { Entity } from "./Entity";
import { Address } from "./Address.entity";
import { ICustomer } from "./ICustomer";
import { IValidator } from "~@Domain/validator/IValidator";
import { DomainError } from "~@Domain/errors/Domain.error";

export class Customer extends Entity implements ICustomer {

	private address!: Address;
	private active: boolean = false;
	private rewards: number = 0;

	constructor(
		private id: string,
		private name: string,
	) {
		super();
	}

	public validate(validator: IValidator<Customer>): void {
		validator.validate(this);
		this.verify();
	}

	public getId(): string {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public changeName(name: string): void {
		this.name = name;
	}

	public isActive(): boolean {
		return this.active;
	}

	public activate() : void {
		if (!this.address) {
			this.notification.addError("address is mandatory to activate", "customer");
			this.verify();
		}
		this.active = true;
	}

	public deactivate() : void {
		this.active = false;
	}

	public getAddress() : Address {
		return this.address;
	}

	public setAddress(address: Address): void {
		this.address = address;
	}

	public getRewards(): number {
		return this.rewards;
	}

	public setRewards(points: number): void {
		this.rewards += points;
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
			street: this.address.getStreet(),
			number: this.address.getNumber(),
			zip: this.address.getZip(),
			city: this.address.getCity(),
			active: this.isActive(),
			rewards: this.getRewards()
		};
	}
}
