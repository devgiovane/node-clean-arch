export type Callback = (payload: { body?: any; params?: any }) => Promise<{}|[]|null>;

export interface IServerHttp {
	on(method: string, url: string, callback: Callback): void;
	listen(port: number): void;
}
