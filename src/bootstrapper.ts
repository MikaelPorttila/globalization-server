import Server from './lib/server';
import LobbyController from './controllers/lobby.controller';
import TempUserController from './controllers/temp-user.controller';
import GameController from './controllers/game.controller';
import DevController from './controllers/dev.controller';
import StatusController from './controllers/status.controller';

export class Bootstrapper {	
	private lobbyController: LobbyController;
	private gameController: GameController;
	private tempUserController: TempUserController;
	private devController: DevController;
	private statusController: StatusController;

	constructor(private server: Server) {

		// Setup REST-APIs
		this.lobbyController = new LobbyController();
		this.gameController = new GameController();
		this.tempUserController = new TempUserController();
		this.statusController = new StatusController();

		// setup routing and start server
		this.configRoutes();

		if(process.env.IS_DEBUG){
			this.devController = new DevController();
			this.server.app.use('/dev', this.devController.router);
			console.log('Development controller registered');
		}

		this.server.start();
	}

	private configRoutes(): void {
		this.server.app.use('/lobby', this.lobbyController.router);
		this.server.app.use('/user', this.tempUserController.router);
		this.server.app.use('/game', this.gameController.router);
		this.server.app.use('/status', this.statusController.router);
		this.server.app.use('/', (req, res) =>  res.send(`Hello {process.env.APPLICATION_NAME}`));
	}
}