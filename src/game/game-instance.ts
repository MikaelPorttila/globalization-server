import { GameMetadata } from "./game-metadata";
import GameState from "./game-state";
import { WorldSize, WorldType } from "../lib/constants";
import GameUserAction from "./game-user-action";

export default class GameInstance {
	id: string;
	databaseId: string;
	name: string;
	password: string;
	owner: { id: string, name: string };
	users: { id: string, name: string }[];
	readyUserIds: string[];
	started: boolean;
	state: GameState;
	metadata: GameMetadata;
	userActions: GameUserAction[];
	slots: number;
	createdDate: Date;
	worldSize: WorldSize;
	worldType: WorldType;
	turnId: string;
}