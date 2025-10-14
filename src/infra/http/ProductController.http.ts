import { IServerHttp } from "./IServer.http";
import { ProductRepository } from "~@Infra/repository/sequelize/Product.repository";
import { CreateProductUseCase } from "~@App/usecase/product/CreateProduct.usecase";
import { UpdateProductUseCase } from "~@App/usecase/product/UpdateProduct.usecase";
import { FindProductUseCase } from "~@App/usecase/product/FindProduct.usecase";
import { ListProductUseCase } from "~@App/usecase/product/ListProduct.usecase";
import { ProductValidator } from "~@Infra/validator/yup/Product.validator";

export class ProductControllerHttp {

	constructor(
		httpServer: IServerHttp,
	) {
		const productRepository = new ProductRepository();
		httpServer.on("POST", "/product", async function ({ body }) {
			const productValidator = new ProductValidator();
			const createProductUseCase = new CreateProductUseCase(productValidator, productRepository);
			return createProductUseCase.execute(body);
		});
		httpServer.on("GET", "/product", async function () {
			const listProductUseCase = new ListProductUseCase(productRepository);
			return listProductUseCase.execute({});
		});
		httpServer.on("GET", "/product/:id", async function ({ params }) {
			const findProductUseCase = new FindProductUseCase(productRepository);
			return findProductUseCase.execute({ id: params.id });
		});
		httpServer.on("PUT", "/product", async function ({ body }) {
			const updateProductUseCase = new UpdateProductUseCase(productRepository);
			return updateProductUseCase.execute(body);
		});
	}

}
