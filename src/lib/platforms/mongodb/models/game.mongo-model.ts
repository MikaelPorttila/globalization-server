import { Document, Schema, Model, model } from "mongoose";
import GameInstance from "../../../../game/game-instance";
import { createOrUpdateMongo } from "../helpers/mongo-helpers";

interface IBaseGameMongoModel {
	gameId: string;
	name: string;
	password: string;
	owner: { userId: string, name: string };
	users: { userId: string, name: string }[];
	readyUserIds: string[];
	started: boolean;
	stateSerialized: string;
	metadataSerialized: string;
	userActionsSerialized: string;
	slots: number;
	createdDate: Date;
	worldSize: number;
	worldType: number;
	turnId: string;
}

interface IGame extends IBaseGameMongoModel, Document { }

const GameSchema = new Schema({
	gameId: String,
	name: String,
	password: String,
	owner: { userId: String, name: String },
	users: [{ userId: String, name: String }],
	readyUserIds: [String],
	started: Boolean,
	stateSerialized: String,
	metadataSerialized: String,
	userActionsSerialized: String,
	slots: Number,
	createdDate: Date,
	worldSize: Number,
	worldType: Number,
	turnId: String
});

const GameInstanceMongoModel: Model<IGame> = model<IGame>("Game", GameSchema);

export function mapToGameInstance(gameInstanceMongoModel: IGame): GameInstance {
	const result = new GameInstance();
	result.databaseId = gameInstanceMongoModel.id;
	result.id = gameInstanceMongoModel.gameId;
	result.name = gameInstanceMongoModel.name;
	result.password = gameInstanceMongoModel.password;
	result.owner = { id: gameInstanceMongoModel.owner.userId, name: gameInstanceMongoModel.owner.name };
	result.users = gameInstanceMongoModel.users.map((u) => { return { id: u.userId, name: u.name }; });
	result.readyUserIds = gameInstanceMongoModel.readyUserIds;
	result.started = gameInstanceMongoModel.started;
	result.state = gameInstanceMongoModel.stateSerialized ? JSON.parse(gameInstanceMongoModel.stateSerialized) : null;
	result.metadata = gameInstanceMongoModel.metadataSerialized ? JSON.parse(gameInstanceMongoModel.metadataSerialized) : null;
	result.userActions = gameInstanceMongoModel.userActionsSerialized ? JSON.parse(gameInstanceMongoModel.userActionsSerialized) : null;
	result.slots = gameInstanceMongoModel.slots;
	result.createdDate = gameInstanceMongoModel.createdDate;
	result.worldSize = gameInstanceMongoModel.worldSize;
	result.worldType = gameInstanceMongoModel.worldType;
	result.turnId = gameInstanceMongoModel.turnId;
	return result;
}

export function mapToMongoUpdateModel(gameInstance: GameInstance): IBaseGameMongoModel {
	const result = <IBaseGameMongoModel>{};
	result.gameId = gameInstance.id;
	result.name = gameInstance.name;
	result.password = gameInstance.password;
	result.owner = { userId: gameInstance.owner.id, name: gameInstance.owner.name };
	result.users = gameInstance.users.map((u) => { return { userId: u.id, name: u.name }; });
	result.readyUserIds = gameInstance.readyUserIds;
	result.started = gameInstance.started;
	result.stateSerialized = JSON.stringify(gameInstance.state);
	result.metadataSerialized = JSON.stringify(gameInstance.metadata);
	result.userActionsSerialized = JSON.stringify(gameInstance.userActions);
	result.slots = gameInstance.slots;
	result.createdDate = gameInstance.createdDate;
	result.worldSize = gameInstance.worldSize;
	result.worldType = gameInstance.worldType;
	result.turnId = gameInstance.turnId;
	return result;
}

export async function mongoGetGameInstance(gameId: string): Promise<GameInstance> {
	let result;
	const mongoModel = await GameInstanceMongoModel.findOne({ gameId });
	if (mongoModel) {
		result = mapToGameInstance(mongoModel);
	}
	return result;
}

export async function mongoStoreGameInstance(gameInstance: GameInstance): Promise<void> {
	if (!gameInstance) {
		return;
	}
	const gameId = gameInstance.id;
	const updateModel = mapToMongoUpdateModel(gameInstance);
	await createOrUpdateMongo(GameInstanceMongoModel, { gameId }, updateModel);
}

export async function mongoGetGames(): Promise<GameInstance[]> {
	let result = [];
	const mongoModel = await GameInstanceMongoModel.find({})
		.where('users.length < slots')
		.where('started').equals(false)
		.exec();
	if (mongoModel) {
		result = mongoModel.map(mm => mapToGameInstance((mm)));
	}
	return result;
}

export async function mongoDeleteGameInstance(gameId: string): Promise<void> {
	await await GameInstanceMongoModel.remove({ gameId });
}

export async function mongoDeleteAllGameInstances(): Promise<void> {
	await await GameInstanceMongoModel.remove({});
} 