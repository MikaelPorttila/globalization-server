import { Router, Request, Response } from 'express';
import Controller from './controller';
import {route} from './../decorators/route.decorator';

export default class StateController extends Controller {

	private state: string;

	constructor(){
		super();
		this.state = "Hello State!";
		//TODO: (Mikael) Temp fix for routing.
		this.router.get("/", this.getGameState);
	}

	//@route("/")
	private getGameState(req: Request, res: Response){
		res.send(this.state);
	}
}