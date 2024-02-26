import { IEventHandler } from "../../@shared/IEvent.handler";
import { CustomerCreatedEvent } from "./CustomerCreated.event";

export class SendConsoleLogTwoHandler implements IEventHandler<CustomerCreatedEvent> {

	public handle(event: CustomerCreatedEvent): void {
		console.log(`This is a second console.log of event: CustomerCreatedEvent`);
	}

}
