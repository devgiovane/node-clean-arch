import { IEventHandler } from "../../@shared/IEvent.handler";
import { ProductCreatedEvent } from "./ProductCreated.event";

export class SendEmailWhenProductCreatedHandler implements IEventHandler<ProductCreatedEvent> {

	public handle(event: ProductCreatedEvent): void {
		console.log(`Sending email to ...`);
	}

}
