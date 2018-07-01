import { Request, Response } from 'express';
import Controller from "../lib/base/controller";
import { checkConnectionStatus } from '../lib/platforms/storage';
import { StoragePlatform } from '../lib/constants';

export default class StatusController extends Controller {
	constructor() {
		super();

		this.router.get('/', this.getStatus);
	}

	async getStatus(req: Request, res: Response): Promise<void> {
		res.send({
			appName: process.env.APPLICATION_NAME,
			storageConnection: await checkConnectionStatus(),
			storageType: process.env.STORAGE_PLATFORM || StoragePlatform.MongoDB
		});
	}
}