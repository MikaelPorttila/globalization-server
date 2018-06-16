export class User {
	id: string;
	name: string;
	mail: string;
	passwordHash: string; 
	lastActive: Date | null;
	accountActivated: Boolean;
	accountActivationCode: String;
}