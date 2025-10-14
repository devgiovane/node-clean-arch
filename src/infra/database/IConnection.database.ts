export interface IConnectionDatabase {
	sync(): Promise<void>;
	close(): Promise<void>;
}
