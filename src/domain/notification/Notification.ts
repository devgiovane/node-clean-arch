export type NotificationMessage = {
	message: string,
	context?: string
}

export class Notification {

	private errors: NotificationMessage[] = [];

	public addError(message: string, context?: string): void {
		this.errors.push({ message, context });
	}

	public hasErrors(): boolean {
		return this.errors.length > 0;
	}

	public getErrors(context?: string): NotificationMessage[] {
		if (context) {
			return this.errors.filter(error => error.context === context);
		}
		return this.errors;
	}

	public messages(context?: string): string {
		return this.getErrors(context)
			.map(error => `${error.context ? `[${error.context}] ` : ''}${error.message}`)
			.join(', ');
	}
}
