import { Request, Response } from 'express';
import Controller from '../lib/base/controller';
import ILoginModel from './models/login.model';
import IUserModel from './models/user.model';
import { hashPassword } from '../lib/crypto/hash';
import guid from '../lib/guid';
import { User } from '../lib/entities/user';
import SignUpModel from './models/signup.model';
import { storeUser } from '../lib/platforms/storage';

//TODO: (MIKAEL) Rename class
export default class TempUserController extends Controller {

	constructor() {
		super();
		this.router.get('/', this.getUser);
		this.router.post('/signup', this.jsonParser, this.signUp);
		this.router.post('/login', this.jsonParser, this.login);
	}

	async signUp(req: Request, res: Response): Promise<void> {
		const model = <SignUpModel>req.body;
		const user = new User();
		user.name = model.username;
		user.passwordHash = await hashPassword(model.password);
		user.accountActivated = false;
		user.accountActivationCode = guid();
		//TODO: (MIKAEL) !!!Remove temp dev code
		if(process.env.IS_DEBUG){
			user.id = <string>this.getTempSecHeader(req);
		}

		await storeUser(user);
		//TODO: (MIKAEL) Mail activation code
	}

	async login(req: Request, res: Response): Promise<void> {
		const model = <ILoginModel>req.body;
		// TODO: (MIKAEL) impl...
	}

	async getUser(req: Request, res: Response): Promise<void> {
		const currentUser = await this.getCurrentUser(req);
		const result = <IUserModel>{
			userId: currentUser.id,
			username: currentUser.name
		};

		res.send(currentUser)
	}
}