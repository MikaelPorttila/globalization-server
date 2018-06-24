import * as express from 'express';
import * as http from "http";

export default class Server {

	app: express.Application;
	private httpServer: http.Server;

	constructor() {
		this.app = express();
	}

	start() {
		this.httpServer = this.app.listen(process.env.PORT, () =>
			console.log('Connection opened'));
	}

	stop() {
		this.httpServer.close(() =>
			console.log('Connection closed'))
	}
}