import { GameActionType } from "../../lib/constants";

export interface IGameActionModel {
	lobbyId: string;
	entityId: string;
	actionType: GameActionType;
	actionMetadata: string[];
}

export function validateGameActionModel(model: IGameActionModel): string[] {
	const result = [];

	if (!model) {
		result.push('Missing post data');
	} else {
		if(!model.lobbyId) result.push('Missing lobbyId field');
		if(!model.actionType) result.push('Missing actionType field');
	}

	return result;
}