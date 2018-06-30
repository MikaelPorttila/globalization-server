import PlayerStateSnapshot from "../../game/snapshots/player-state.snapshot";
import guid from "../guid";
import { GameMetadata, getTile } from "../../game/game-metadata";
import GameState from "../../game/game-state";
import { updateSnapshot } from "../platforms/storage";

export default async function computeSnapshots(
	gameState: GameState,
	gameMetadata: GameMetadata,
	userIds: string[],
	gameId: string,
	turnId: string
): Promise<void> {
	for (const userId of userIds) {
		const snapshot = new PlayerStateSnapshot();
		snapshot.id = guid();
		snapshot.gameId = gameId;
		snapshot.userId = userId;
		snapshot.entities = [];
		snapshot.tiles = [];
		snapshot.turnId = turnId;
		const userEntities = gameState.entities.filter(e => e.ownerId === userId);

		//TODO:(MIKAEL) get vision range from stats
		const visionRange = 1;
		let processedTiles = {};
		for (const entity of userEntities) {

			const startPosTopLeft = {
				x: entity.x - visionRange,
				y: entity.y - visionRange
			}

			const endPosBottomRight = {
				x: entity.x + visionRange,
				y: entity.y + visionRange
			}

			for (let y = startPosTopLeft.y; y <= endPosBottomRight.y; y++) {
				for (let x = startPosTopLeft.x; x <= endPosBottomRight.x; x++) {
					// TODO:(MIKAEL) make sure that the tile is not outside of viewpoint
					const tileKey = x + "-" + y;
					if (!processedTiles[tileKey]) {
						const tile = getTile(gameMetadata, x, y);
						snapshot.tiles.push(tile);
						const tileEntities = gameState.entities.filter(e => e.x === x && e.y === y);
						for (let tileEntity of tileEntities) {
							snapshot.entities.push(tileEntity);
						}

						processedTiles[tileKey] = true;
					}
				}
			}
		}

		await updateSnapshot(snapshot);
	}
}