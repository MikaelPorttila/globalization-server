import { GameActionType } from '../lib/constants';
import moveEntity from './actions/move.action';
import { GameMetadata } from './game-Metadata';
import GameState from './game-state';
import { getGameInstance, storeGameInstance } from '../lib/platforms/storage';
import GameUserAction from './game-user-action';
import GameInstance from './game-instance';
import guid from '../lib/guid';
import computeSnapshots from '../lib/procedures/snapshot.procedure';

export default class GameHost {

	static async tryProcessNext(gameId: string) {

		const gameInstance = await getGameInstance(gameId);
		if (gameInstance.readyUserIds.length === gameInstance.users.length) {
			gameInstance.state = GameHost.processGame(
				gameInstance.state, 
				gameInstance.metadata, 
				gameInstance.userActions, 
				gameInstance.turnId);

			GameHost.resetTurn(gameInstance);
			storeGameInstance(gameInstance);

			await computeSnapshots(
				gameInstance.state,
				gameInstance.metadata,
				gameInstance.users.map(u => u.id),
				gameInstance.id,
				gameInstance.turnId);
		}
	}

	private static resetTurn(gameInstance: GameInstance): void {
		gameInstance.turnId = guid();
		gameInstance.userActions = [];
		gameInstance.readyUserIds = [];
	}

	private static processGame(
		gameState: GameState,
		gameMetadata: GameMetadata,
		userActions: GameUserAction[],
		turnId: string
	): GameState {
		const result = { ...gameState };
		const turnActions = userActions.filter(action => action.turnId === turnId);
		for (const userAction of turnActions) {
			switch (userAction.actionType) {
				case GameActionType.Move:
					const entity = result.entities.find(e => e.entityId === userAction.entityId);
					moveEntity(entity, userAction.actionMetadata, gameMetadata);
					break;
			}
		}

		return result;
	}
}