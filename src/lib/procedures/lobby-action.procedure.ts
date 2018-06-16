import { LobbyActionType } from "../../controllers/models/lobby-action.model";
import { User } from "../entities/user";
import { getGameInstance, storeGameInstance } from "../platforms/storage";
import { setupWorldAndInitialGameState } from "./create-game.procedure";
import guid from "../guid";
import computeSnapshots from "./snapshot.procedure";

export default async function processLobbyAction(
	gameId: string,
	user: User,
	lobbyActionType: LobbyActionType
) {
	const gameInstance = await getGameInstance(gameId);
	const userIndex = gameInstance.users.findIndex(u => u.id === user.id);
	switch (lobbyActionType) {
		case LobbyActionType.Leave:
			let modifiedData = false;
			if (userIndex != -1) {
				gameInstance.users.splice(userIndex, 1);
				modifiedData = true;
			}

			const readyUserIndex = gameInstance.readyUserIds.findIndex(id => id === user.id);
			if (readyUserIndex != -1) {
				gameInstance.readyUserIds.splice(readyUserIndex, 1);
				modifiedData = true;
			}

			if (modifiedData) {
				await storeGameInstance(gameInstance);
			}

			break;
		case LobbyActionType.ReadyUp:
			let readyUserLookupIndex = gameInstance.readyUserIds.findIndex(id => id === user.id);
			if (readyUserLookupIndex !== -1) {
				gameInstance.readyUserIds.splice(readyUserLookupIndex, 1);
			} else {
				gameInstance.readyUserIds.push(user.id);
			}
			await storeGameInstance(gameInstance);

			break;
		case LobbyActionType.startGame:
			if (user.id === gameInstance.owner.id && !gameInstance.started) {
				const allReady = gameInstance.readyUserIds.every((id) =>
					gameInstance.users.some((u) => u.id === id));

				if (allReady) {
					gameInstance.started = true;
					gameInstance.readyUserIds = [];
					gameInstance.userActions = [];
					gameInstance.turnId = guid();
					await setupWorldAndInitialGameState(gameInstance);
					await computeSnapshots(
						gameInstance.state,
						gameInstance.metadata,
						gameInstance.users.map(u => u.id),
						gameInstance.id,
						gameInstance.turnId);
					await storeGameInstance(gameInstance);
				}
			}
			break;
	}
}