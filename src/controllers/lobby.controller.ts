// lib
import { Request, Response } from 'express';
// Game
import Host from '../game/game-host';
// API domain 
import Controller from "../lib/base/controller";
import { getGameInstance, getGames } from '../lib/platforms/storage';
import LobbyModel from './models/lobby.model';
import { LobbyActionModel } from './models/lobby-action.model';
import { joinLobby, JoinLobbyResult } from '../lib/procedures/join-lobby.procedure';
import setupGame from '../lib/procedures/setup-game.procedure';
import processLobbyAction from '../lib/procedures/lobby-action.procedure';
import { IJoinLobbyModel } from './models/join-lobby.model';

export default class LobbyController extends Controller {

	constructor() {
		super();
		this.router.get('/', this.getLobbies);
		this.router.get('/:lobbyId', this.getLobby);
		this.router.post('/', this.jsonParser, this.createOrUpdateLobby);
		this.router.post('/join', this.jsonParser, this.joinGameLobby);
		this.router.post('/action', this.jsonParser, this.lobbyAction);
	}

	async getLobbies(req: Request, res: Response): Promise<void> {
		const gameInstances = await getGames();
		const result = gameInstances.map((gameInstance) => LobbyModel.fromGameInstance(gameInstance));
		res.send(result);
	}

	async getLobby(req: Request, res: Response): Promise<void> {
		const gameInstance = await getGameInstance(req.params.lobbyId);
		if (!gameInstance) {

			res.statusCode = 404;
			res.send("Game not found");
			return;
		}

		const result = LobbyModel.fromGameInstance(gameInstance);
		res.send(result);
	}

	async createOrUpdateLobby(req: Request, res: Response): Promise<void> {
		const model = <LobbyModel>req.body;
		if (!model.name || model.name.length === 0) {
			res.sendStatus(400).send('Lobby name must be assigned');
			return;
		}

		if (model.slots < 1) {
			res.sendStatus(400).send("max count of users can't be lower than 1");
			return;
		}

		const user = await this.getCurrentUser(req);
		const result = await setupGame(
			model.id,
			user,
			model.name,
			model.password,
			model.slots,
			model.worldType,
			model.worldSize);

		if (!result) {
			res.statusCode = 404;
			res.send("GameId couldn't be found");
		}

		res.send(result.id);
	}

	async joinGameLobby(req: Request, res: Response): Promise<void> {
		const model = <IJoinLobbyModel>req.body
		const user = await this.getCurrentUser(req);

		const result = await joinLobby(model.lobbyId, user, model.password);
		switch (result) {
			case JoinLobbyResult.WrongPassword:
				res.statusCode = 401;
				res.send("Wrong password");
				break;

			default:
				res.sendStatus(200);
				break;
		}
	}

	async lobbyAction(req: Request, res: Response): Promise<void> {
		const model = <LobbyActionModel>req.body;
		const user = await this.getCurrentUser(req);
		await processLobbyAction(model.lobbyId, user, model.actionType);
		res.send(200);
	}
}