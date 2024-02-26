import { Address } from "./Address.entity";

export class Customer {

	private address!: Address;
	private active: boolean = false;
	private rewards: number = 0;

	constructor(
		private id: string,
		private name: string,
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
	}

	public getId(): string {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public changeName(name: string): void {
		this.name = name;
		this.validate();
	}

	public isActive(): boolean {
		return this.active;
	}

	public activate() : void {
		if (!this.address) {
			throw new Error("address is mandatory to activate");
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
