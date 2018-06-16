import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = process.env.passwordSaltRounds ? parseInt(process.env.passwordSaltRounds) : 10;
	const result = await bcrypt.hash(password, saltRounds);
	return result;
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {	
	const result = await bcrypt.compare(password, hash);
	return result;
}