import * as yup from 'yup';

import { IValidator } from "~@Domain/validator/IValidator";
import { Customer } from "~@Domain/entity/Customer.entity";

export class CustomerValidator implements IValidator<Customer> {

	public validate(entity: Customer): void {
		try {
			const schema = yup.object({
				id: yup.string().required("id is required"),
				name: yup.string().required("name is required"),
			});
			schema.validateSync({
				id: entity.getId(),
				name: entity.getName()
			}, { abortEarly: false });
		} catch (error) {
			const v = error as yup.ValidationError;
			v.errors.forEach(function (error) {
				entity.notification.addError(error, "customer");
			});
		}
	}

}
