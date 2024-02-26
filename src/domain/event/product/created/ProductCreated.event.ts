import { IEvent } from "../../@shared/IEvent";

export class ProductCreatedEvent implements IEvent {

	public dateOccurred: Date;

	constructor(
		public readonly data: any
	) {
		this.dateOccurred = new Date();
	}

}
