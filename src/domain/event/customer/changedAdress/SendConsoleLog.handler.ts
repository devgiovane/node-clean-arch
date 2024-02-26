import { IEventHandler } from "../../@shared/IEvent.handler";
import { CustomerChangedAddressEvent } from "./CustomerChangedAddress.event";

export class SendConsoleLogHandler implements IEventHandler<CustomerChangedAddressEvent> {

	public handle(event: CustomerChangedAddressEvent) {
		const { id, name, address } = event.data;
		console.log(`Address of client: ${id}, ${name} changed to: ${address}`);
	}

}
