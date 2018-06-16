import * as express from 'express';
import * as http from "http";

export default class Server {

	app: express.Application;
	private port: number | string;
	private httpServer: http.Server;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
	}

	start() {
		this.httpServer = this.app.listen(this.port, () =>
			console.log('Connection opened'));
	}

	stop() {
		this.httpServer.close(() =>
			console.log('Connection closed'))
	}
}