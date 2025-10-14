import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";
import { ExpressHttp } from "~@Infra/http/Express.http";
import { CustomerControllerHttp } from "~@Infra/http/CustomerController.http";
import { ProductControllerHttp } from "~@Infra/http/ProductController.http";

(async function () {
	const connectionDatabase = new SequelizeDatabase();
	await connectionDatabase.sync();
	const serverHttp = new ExpressHttp();
	new ProductControllerHttp(serverHttp);
	new CustomerControllerHttp(serverHttp);
	serverHttp.listen(3000);
})();
