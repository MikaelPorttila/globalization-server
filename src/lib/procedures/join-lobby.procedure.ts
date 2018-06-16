import { User } from "../entities/user";
import { getGameInstance, storeGameInstance } from "../platforms/storage";
import { checkPassword } from "../crypto/hash";

export async function joinLobby(gameId: string, user: User, password: string): Promise<JoinLobbyResult> {
	const gameInstance = await getGameInstance(gameId);

	if(gameInstance.password && gameInstance.password.length > 0 && !checkPassword(password, gameInstance.password)){
		return JoinLobbyResult.WrongPassword;
	}

	if(!gameInstance.users.some(u => u.id === user.id)){
		gameInstance.users.push({id: user.id, name: user.name});
		await storeGameInstance(gameInstance);
	}

	return JoinLobbyResult.Joined;
}

export enum JoinLobbyResult {
	Joined = 0,
	WrongPassword = 1
}