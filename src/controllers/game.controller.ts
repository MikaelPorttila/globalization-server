import { Request, Response } from 'express';
import Controller from "./../lib/base/controller";
import { IGameActionModel, validateGameActionModel } from './models/game-action.model';
import { getSnapshot } from '../lib/platforms/storage';
import processUserAction from '../lib/procedures/user-action.procedure';
import GameUserAction from '../game/game-user-action';
import GameHost from '../game/game-host';

export default class GameController extends Controller {

	constructor() {
		super();
		this.router.post("/action", this.jsonParser, this.pushAction);
		this.router.get("/state/:lobbyId", this.getGameState);
	}

	private async getGameState(req: Request, res: Response): Promise<void> {
		const currentUser = await this.getCurrentUser(req);
		const result = await getSnapshot(req.params.lobbyId, currentUser.id);
		res.send(result);
	}

	private async pushAction(req: Request, res: Response): Promise<void> {
		const model = <IGameActionModel>req.body;
		const modelValidationResult = validateGameActionModel(model);

		if (modelValidationResult.length > 0) {
			const errorMessage = modelValidationResult
				.reduce((error: string, msg: string) => error + "\n" + msg);
			res.statusCode = 422;
			res.send(errorMessage);
			return;
		}

		const currentUser = await this.getCurrentUser(req);
		const userAction = new GameUserAction;
		userAction.userId = currentUser.id;
		userAction.entityId = model.entityId;
		userAction.actionType = model.actionType;
		userAction.actionMetadata = model.actionMetadata;

		const processNext = await processUserAction(
			model.lobbyId,
			currentUser.id,
			userAction);

		if (processNext) {
			await GameHost.tryProcessNext(model.lobbyId);
		}

		res.status(200);
	}
}