import * as yup from 'yup';

import { IValidator } from "~@Domain/validator/IValidator";
import { Product } from "~@Domain/entity/Product.entity";

export class ProductValidator implements IValidator<Product> {

	public validate(entity: Product): void {
		try {
			const schema = yup.object({
				id: yup.string().required("id is required"),
				name: yup.string().required("name is required"),
				price: yup.number().moreThan(0).required("price is required")
			});
			schema.validateSync({
				id: entity.getId(),
				name: entity.getName(),
				price: entity.getPrice()
			}, { abortEarly: false });
		} catch (error) {
			const v = error as yup.ValidationError;
			v.errors.forEach(function (error) {
				entity.notification.addError(error, "product");
			});
		}
	}

}
