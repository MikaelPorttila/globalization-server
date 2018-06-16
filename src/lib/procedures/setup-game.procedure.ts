import { User } from "../entities/user";
import { WorldType, WorldSize } from "../constants";
import { getGameInstance, storeGameInstance } from "../platforms/storage";
import GameInstance from "../../game/game-instance";
import guid from "../guid";
import { hashPassword } from "../crypto/hash";

export default async function setupGame(
	id: string,
	user: User,
	name: string,
	password: string,
	slots: number,
	worldType: WorldType,
	worldSize: WorldSize
): Promise<GameInstance> {

	let result: GameInstance;
	if (id) {
		result = await getGameInstance(id);
		if(!result){
			return null;
		}
	} else {
		const userFields = { id: user.id, name: user.name };
		result = new GameInstance;
		result.id = guid();
		result.owner = userFields;
		result.createdDate = new Date();
		result.users = [userFields];
		result.readyUserIds = [];
		result.started = false;
	}

	// actual fields that can be modified 
	// after the game instance has been created
	result.name = name;
	result.slots = slots;
	result.password = await hashPassword(password);
	result.worldSize = worldSize;
	result.worldType = worldType;

	await storeGameInstance(result);
	return result;
}