export class LobbyActionModel {
	actionType: LobbyActionType
	lobbyId: string;
}

export enum LobbyActionType {
	ReadyUp = 1,
	Leave = 2,
	startGame = 3
}