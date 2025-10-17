import { ExpressHttp  } from "~@Infra/http/Express.http";
import { ProductControllerHttp } from "~@Infra/http/ProductController.http";
import { CustomerControllerHttp } from "~@Infra/http/CustomerController.http";

const serverHttp = new ExpressHttp();
new ProductControllerHttp(serverHttp);
new CustomerControllerHttp(serverHttp);

export const server = serverHttp.getServer();
