import { GameActionType } from "../constants";
import GameUserAction from "../../game/game-user-action";
import { getGameInstance, storeGameInstance } from "../platforms/storage";

export default async function processUserAction(
	gameId: string,
	userId: string,
	userAction: GameUserAction
): Promise<boolean> {
	let result = false;
	const gameInstance = await getGameInstance(gameId);

	if (userAction.actionType === GameActionType.CompleteTurn) {

		if (!gameInstance.readyUserIds.some(u => u === userId)) {
			gameInstance.readyUserIds.push(userId);
		}

		result = gameInstance.readyUserIds
			.every(uid => gameInstance.users
				.some(e => e.id === uid));
	} else {
		gameInstance.userActions.push(userAction);
	}
	
	storeGameInstance(gameInstance);
	return result;
}