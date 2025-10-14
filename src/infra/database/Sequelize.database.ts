import { Sequelize } from "sequelize-typescript";

import * as mappers from '~@Infra/mapper/sequelize';
import { IConnectionDatabase } from "~@Infra/database/IConnection.database";

export class SequelizeDatabase implements IConnectionDatabase {

	private readonly sequelize: Sequelize;

	constructor() {
		this.sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		this.sequelize.addModels(Object.values(mappers));
	}

	public async sync(): Promise<void> {
		await this.sequelize.sync();
	}

	public async close(): Promise<void> {
		await this.sequelize.close();
	}

}
