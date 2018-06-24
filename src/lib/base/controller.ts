import { Router, Request } from 'express';
import * as autoBind from 'auto-bind';
import { json } from 'body-parser';
import { User } from '../entities/user';
import { getUser } from '../platforms/storage';

export default class Controller {

	router: Router;
	jsonParser;

	constructor() {
		this.router = Router();
		this.jsonParser = json();
		autoBind(this);
	}

	getTempSecHeader(req: Request): string {
		const result = req.headers["temp-login"];
		return <string>result;
	}

	async getCurrentUser(req: Request): Promise<User> {
		//TODO: (Mikael) remove development header

		let result = undefined;

		if(process.env.IS_DEBUG){
			const devSecHeader = this.getTempSecHeader(req);
			result = await getUser(devSecHeader);
		}
		
		return result;
	}
}