import { IEventHandler } from "../../@shared/IEvent.handler";
import { CustomerCreatedEvent } from "./CustomerCreated.event";

export class SendConsoleLogOneHandler implements IEventHandler<CustomerCreatedEvent> {

	public handle(event: CustomerCreatedEvent): void {
		console.log(`This is a first console.log of event: CustomerCreatedEvent`);
	}

}
