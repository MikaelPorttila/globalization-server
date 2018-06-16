import { Request, Response } from 'express';
import Controller from '../lib/base/controller';
import { 
	deleteAllGameInstances, 
	deleteAllSnapshots, 
	getGames, 
	getAllGames 
} from '../lib/platforms/storage';

export default class DevController extends Controller {

	constructor() {
		super();
		this.router.get('/games', this.getAllGames);
		this.router.post('/clear', this.jsonParser, this.clear);
	}

	async clear(req: Request, res: Response): Promise<void> {
		await deleteAllGameInstances();
		await deleteAllSnapshots();
		res.sendStatus(200);
	}

	async getAllGames(req: Request, res: Response): Promise<void> {
		const games = await getAllGames();
		res.send(games);
	}
}