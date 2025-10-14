import { Entity } from "~@Domain/entity/Entity";

export class Address extends Entity{

	constructor(
		private street: string,
		// tslint:disable-next-line:variable-name
		private number: number,
		private zip: string,
		private city: string,
	) {
		super();
		this.validate();
	}

	private validate() {
		if (this.street.length === 0) {
			throw new Error("street is required");
		}
		if (this.number === 0) {
			throw new Error("number is required");
		}
		if  (this.zip.length === 0) {
			throw new Error("zip is required");
		}
		if (this.city.length === 0) {
			throw new Error("city is required");
		}
	}

	public getStreet(): string {
		return this.street;
	}

	public getNumber(): number {
		return this.number;
	}

	public getZip(): string {
		return this.zip;
	}

	public getCity(): string {
		return this.city;
	}

	toString(): string {
		return `${this.street}, ${this.number} - ${this.city}`;
	}

}
