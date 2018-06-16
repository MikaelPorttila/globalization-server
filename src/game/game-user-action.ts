import { GameActionType } from "../lib/constants";

export default class GameUserAction {
	userId: string;
	turnId: string;
	actionType: GameActionType;
	actionMetadata: string[]
	entityId: string;
}