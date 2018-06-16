import { StoragePlatform } from "../constants";
import GameInstance from "../../game/game-instance";
import { User } from "../entities/user";
import PlayerStateSnapshot from "../../game/snapshots/player-state.snapshot";
import { 
	mongoGetUserById, 
	mongoStoreUser 
} from "./mongodb/models/user.mongo-model";
import { 
	mongoGetSnapshot, 
	mongoStoreSnapshot, 
	mongoUpdateOrCreateSnapshot, 
	mongoDeleteSnapshot, 
	mongoDeleteAllSnapshots 
} from "./mongodb/models/snapshot.mongo-model";
import { 
	mongoGetGameInstance, 
	mongoStoreGameInstance, 
	mongoDeleteGameInstance, 
	mongoDeleteAllGameInstances, 
	mongoGetGames 
} from "./mongodb/models/game.mongo-model";

//TODO:(Mikael) Load storage platform from configuration.
const storagePlatform = StoragePlatform.MongoDB;

//==============================================================
//=============================  USER  =========================
//==============================================================

export async function getUser(userId: string): Promise<User> {
	let result: User;
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			result = await mongoGetUserById(userId);
			break;
	}
	return result;
}

export async function storeUser(user: User): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoStoreUser(user);
			break;
	}
}

//==============================================================
//=======================  Game Instance  ======================
//==============================================================

export async function getGameInstance(gameId: string): Promise<GameInstance> {
	let result: GameInstance;
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			result = await mongoGetGameInstance(gameId);
			break;
	}
	return result;
}

export async function storeGameInstance(gameInstance: GameInstance): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoStoreGameInstance(gameInstance);
			break;
	}
}

export async function deleteGameInstance(gameId: string): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoDeleteGameInstance(gameId);
			break;
	}
}

export async function deleteAllGameInstances(): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoDeleteAllGameInstances();
			break;
	}
}

export async function getGames(): Promise<GameInstance[]> {
	let result = [];
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			result = await mongoGetGames();
			break;
	}
	return result;
}

//==============================================================
//=========================  Snapshots  ========================
//==============================================================

export async function getSnapshot(gameId: string, userId: string): Promise<PlayerStateSnapshot> {
	let result: PlayerStateSnapshot;
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			result = await mongoGetSnapshot(gameId, userId);
			break;
	}
	return result;
}

export async function storeSnapshot(snapshot: PlayerStateSnapshot): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoStoreSnapshot(snapshot);
			break;
	}
}

export async function updateSnapshot(snapshot: PlayerStateSnapshot): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoUpdateOrCreateSnapshot(snapshot);
			break;
	}
}

export async function deleteAllSnapshots(): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoDeleteAllSnapshots();
			break;
	}
}

export async function deleteSnapshot(snapshotId: string): Promise<void> {
	switch (storagePlatform) {
		case StoragePlatform.MongoDB:
			await mongoDeleteSnapshot(snapshotId);
			break;
	}
}