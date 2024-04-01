import { Sequelize } from "sequelize-typescript";
import { ProductMapper } from "~@Infra/mapper/sequelize/Product.mapper";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { CreateProductUseCase } from "./CreateProduct.usecase";
import { UpdateProductUseCase } from "./UpdateProduct.usecase";
import { FindProductUseCase } from "./FindProduct.usecase";

describe('Update Product UseCase', function () {

	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: {force: true},
		});
		sequelize.addModels([ProductMapper]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it('should be able update product', async function () {
		const productRepository = new ProductRepository();
		const createProductUseCase = new CreateProductUseCase(productRepository);
		const input1 = {
			name: 'Product 1',
			price: 10.0
		};
		const output1 = await createProductUseCase.execute(input1);
		const updateProductUseCase = new UpdateProductUseCase(productRepository);
		const input2 = {
			id: output1.id,
			name: 'Product 2',
			price: 11.1
		};
		const output2 = await updateProductUseCase.execute(input2);
		const input3 = {
			id: output2.id
		}
		const findProductUseCase= new FindProductUseCase(productRepository);
		const output3 = await findProductUseCase.execute(input3);
		expect(output3.id).toBeDefined();
		expect(output3.name).toBe("Product 2");
		expect(output3.price).toBe(11.1);
	});

});
