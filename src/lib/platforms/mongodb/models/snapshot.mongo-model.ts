import { Document, Schema, Model, model } from "mongoose";
import PlayerStateSnapshot from "../../../../game/snapshots/player-state.snapshot";
import { createOrUpdateMongo } from "../helpers/mongo-helpers";

interface IGameStateSnapshot {
	snapshotId: string;
	gameId: string;
	userId: string;
	turnId: string;
	serializedEntities: string;
	serializedTiles: string;
}

interface IGameStateSnapshotDocument extends IGameStateSnapshot, Document { }

const GameStateSnapshotMongoModelSchema = new Schema({
	snapshotId: String,
	gameId: String,
	userId: String,
	turnId: String,
	serializedEntities: String,
	serializedTiles: String
});

const GameStateSnapshotMongoModel: Model<IGameStateSnapshotDocument>
	= model<IGameStateSnapshotDocument>("GameStateSnapshot", GameStateSnapshotMongoModelSchema);

export function mapToMongoModelSnapshot(snapshot: PlayerStateSnapshot): IGameStateSnapshotDocument {
	const result = new GameStateSnapshotMongoModel();
	result.snapshotId = snapshot.id;
	result.gameId = snapshot.gameId;
	result.userId = snapshot.userId;
	result.turnId = snapshot.turnId;
	result.serializedEntities = JSON.stringify(snapshot.entities);
	result.serializedTiles = JSON.stringify(snapshot.tiles);
	return result;
}

export function mapToSnapshot(snapshotMongoModel: IGameStateSnapshotDocument): PlayerStateSnapshot {
	const result = new PlayerStateSnapshot();
	result.id = snapshotMongoModel.snapshotId;
	result.gameId = snapshotMongoModel.gameId;
	result.userId = snapshotMongoModel.userId;
	result.turnId = snapshotMongoModel.turnId;
	result.entities = JSON.parse(snapshotMongoModel.serializedEntities);
	result.tiles = JSON.parse(snapshotMongoModel.serializedTiles);
	return result;
}

export async function mongoGetSnapshot(gameId: string, userId: string): Promise<PlayerStateSnapshot> {
	let result;
	const findResult = await GameStateSnapshotMongoModel.findOne({ gameId, userId });
	if (findResult) {
		result = mapToSnapshot(findResult);
	}
	return result;
}

export async function mongoStoreSnapshot(snapshot: PlayerStateSnapshot): Promise<void> {
	const mongoModel = mapToMongoModelSnapshot(snapshot);
	await mongoModel.save();
}

export async function mongoUpdateOrCreateSnapshot(snapshot: PlayerStateSnapshot): Promise<void> {
	const gameId = snapshot.gameId;
	const userId = snapshot.userId;
	const mongoModel = mapToMongoModelSnapshot(snapshot);
	await createOrUpdateMongo(GameStateSnapshotMongoModel, { gameId, userId }, mongoModel);
}

export async function mongoDeleteSnapshot(snapshotId: string): Promise<void> {
	await GameStateSnapshotMongoModel.remove({ snapshotId });
}

export async function mongoDeleteAllSnapshots(): Promise<void> {
	await GameStateSnapshotMongoModel.remove({});
}