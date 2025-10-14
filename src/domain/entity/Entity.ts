import { Notification } from "~@Domain/notification/Notification";

export abstract class Entity {

	public readonly notification: Notification;

	protected constructor() {
		this.notification = new Notification();
	}

}
