import { IProductRepository } from "~@Domain/repository/IProduct.repository";
import { Product } from "~@Domain/entity/Product.entity";
import { ProductMapper } from "../../mapper/sequelize/Product.mapper";

export class ProductRepository implements IProductRepository {

	public async find(id: string): Promise<Product> {
		const product = await ProductMapper.findOne({
			where: { id },
			rejectOnEmpty: false,
		});
		return new Product(product.id, product.name, product.price);
	}

	public async findAll(): Promise<Array<Product>> {
		const products = await ProductMapper.findAll();
		return products.map(product =>
			new Product(product.id, product.name, product.price)
		);
	}

	public async save(entity: Product): Promise<void> {
		await ProductMapper.create({
			id: entity.getId(),
			name: entity.getName(),
			price: entity.getPrice(),
		});
	}

	public async update(entity: Product): Promise<void> {
		await ProductMapper.update({
			name: entity.getName(),
			price: entity.getPrice(),
		}, {
			where: {
				id: entity.getId()
			},
			returning: undefined
		});
	}

}
