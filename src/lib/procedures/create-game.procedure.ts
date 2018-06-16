import { EntityType, TileType } from "../constants";
import { generateWorld } from "../../game/generators/world.generator";
import GameEntity from "../../game/entities/game-entity";
import { getSingleRandomTile } from "../../game/game-Metadata";
import Tile from "../../game/Tile";
import GameState from "../../game/game-state";
import GameInstance from "../../game/game-instance";

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

		const townEntity = new GameEntity();
		townEntity.entityType = EntityType.Town;
		townEntity.ownerId = user.id;
		townEntity.x = startLocationTile.x;
		townEntity.y = startLocationTile.y;

		gameState.entities.push(townEntity);
	}
	gameInstance.state = gameState;
}