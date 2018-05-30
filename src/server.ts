import * as express from 'express';
import * as http from "http";
import StateController from './controllers/state.controller';

export default class Server {
	
	private app: express.Application; 
	private port: number | string;
	private httpListener: http.Server;

	constructor(){
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.configRoutes();
		this.start();
	}

	private configRoutes() {
		this.app.get('/', (req, res) => res.send('Hello Globalization!'));
		this.app.use("/state", new StateController().router);
	}

	private start(){
		this.httpListener = this.app.listen(3000, () => 
			console.log('Connection opened'));
	}

	public stop(){
		this.httpListener.close(() => 
			console.log('Connection closed'))
	}
}