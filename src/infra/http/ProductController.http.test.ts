import { server } from '../../__test__/setup';
import { once } from 'node:events';
import http, { Server } from "node:http";
import { SequelizeDatabase } from "~@Infra/database/Sequelize.database";

describe('~[E2E] Product Controller', function () {

	let address: string;
	let httpServer: Server;
	let sequelize: SequelizeDatabase;

	beforeAll(async function () {
		sequelize = new SequelizeDatabase();
		await sequelize.sync();
		httpServer = http.createServer(server);
		httpServer.listen(0);
		await once(httpServer, 'listening');
		address = `http://localhost:${(httpServer.address() as any).port}`
	});

	afterAll(async function () {
		await sequelize.close();
		httpServer.close();
	});

	it('should be able a create product', async function () {
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const response = await fetch(`${address}/product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.id).toBeDefined();
	});

	it('should be able find product', async function () {
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const response1 = await fetch(`${address}/product`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		expect(response1.status).toBe(200);
		const output1 = await response1.json();
		expect(output1.id).toBeDefined();
		const response2 = await fetch(`${address}/product/${output1.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		expect(response2.status).toBe(200);
		const output2 = await response2.json();
		expect(output2.id).toBeDefined();
		expect(output2.name).toBe(input.name);
		expect(output2.price).toBe(input.price);
	});

});
