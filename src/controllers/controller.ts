import { Router, Request, Response } from 'express';
import * as autoBind from 'auto-bind';

export default class Controller {

	router: Router;
	constructor(){
		this.router = Router();
		autoBind(this);
	}

	registerRoutes(routes: any[]): void {
		for(var route of routes){
			this.router.get(route.path, route.func.bind(this));
		}
	}
}
