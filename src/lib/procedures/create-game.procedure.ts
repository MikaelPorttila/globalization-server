import { EntityType, TileType } from "../constants";
import { generateWorld } from "../../game/generators/world.generator";
import GameEntity from "../../game/entities/game-entity";
import Tile from "../../game/Tile";
import GameState from "../../game/game-state";
import GameInstance from "../../game/game-instance";
import { spawnEntity } from "../../game/entities/game-entities";
import { findEntitySpawnLocation, getSingleRandomTile } from "../../game/helpers/position.helper";
import { GameMetadata } from "../../game/game-Metadata";

export async function setupWorldAndInitialGameState(gameInstance: GameInstance): Promise<void> {

	gameInstance.metadata = generateWorld(gameInstance.worldSize, gameInstance.worldType);
	const gameState = new GameState();
	gameState.entities = [];

	for (const user of gameInstance.users) {
		//TODO:(MIKAEL) Get random land tile and the same land mass should contain x number of resources. 
		let startLocationTile: Tile = null;

		// Find empty tile to spawn player on
		for(let i = 5; i-- > 0;){
			const randomTile = getSingleRandomTile(gameInstance.metadata, TileType.Ground, TileType.Mountain, TileType.Woods);
			if (!gameState.entities.some(e => e.x === randomTile.x && e.y === randomTile.y)) {
				startLocationTile = randomTile;
				break;
			}
		}

		if (!startLocationTile) {
			// force spawn entity
			startLocationTile = getSingleRandomTile(gameInstance.metadata, TileType.Ground, TileType.Mountain, TileType.Woods);
		}

		const playerSpawnEntities = spawnNewUser(user.id, startLocationTile, gameInstance.metadata);
		gameState.entities = [...gameState.entities, ...playerSpawnEntities];
	}
	gameInstance.state = gameState;
}

function spawnNewUser(userId: string, startLocationTile: Tile, gameMetadata: GameMetadata): GameEntity[]{

	const workerSpawnTile = findEntitySpawnLocation(startLocationTile, 2, gameMetadata, [TileType.Ground, TileType.Woods, TileType.Mountain]);
	const result = [
		spawnEntity(EntityType.Town, userId, startLocationTile.x, startLocationTile.y),
		spawnEntity(EntityType.Scout, userId, workerSpawnTile.x, workerSpawnTile.y)	
	];
	return result; 
} 