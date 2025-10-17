import morgan from "morgan";
import express, { Express, Request, Response } from "express";

import { IServerHttp, Callback } from "~@Infra/http/IServer.http";
import { ApplicationError } from "~@App/errors/Application.error";

export class ExpressHttp implements IServerHttp {

	private readonly server: Express;

	constructor() {
		this.server = express();
		this.server.use(express.json());
		// this.server.use(morgan('⚡️[~:method] :url HTTP/:http-version :status :response-time ms'));
	}

	public getServer(): Express {
		return this.server;
	}

	public on(method: string, url: string, callback: Callback): void {
		this.server[method.toLowerCase() as keyof Express](url, async function (req: Request, res: Response) {
			try {
				const output = await callback({ body: req.body, params: req.params });
				return res.json(output);
			} catch (error) {
				const e = error as ApplicationError;
				return res.status(e.status).json(e.message);
			}
		});
    }

	public listen(port: number): void {
		this.server.listen(port, function () {
			console.log(`⚡️[~server] is running in http://localhost:${port}`)
		});
	}

}
