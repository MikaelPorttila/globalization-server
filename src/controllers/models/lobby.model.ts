import { WorldType, WorldSize } from "../../lib/constants";
import GameInstance from "../../game/game-instance";

export default class LobbyModel {
	id: string;
	name: string;
	slots: number;
	userCount: number;
	created: Date;
	ownerName: string;
	ownerId: string;
	users: any[];
	password: string;
	worldType: WorldType;
	worldSize: WorldSize;

	static fromGameInstance(gameInstance: GameInstance): LobbyModel {
		const result = new LobbyModel;
		result.id = gameInstance.id;
		result.name = gameInstance.name;
		result.userCount = gameInstance.users.length;
		result.slots = gameInstance.slots;
		result.created = gameInstance.createdDate;
		result.ownerName = gameInstance.owner.name;
		return result;
	}
}