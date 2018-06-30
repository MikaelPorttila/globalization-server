import Tile from "../tile";
import { GameMetadata, getTile } from "./../game-metadata";
import { TileType } from "../../lib/constants";

export function findEntitySpawnLocation(	
	baseLocationTile: Tile,
	range: number,
	gameMetadata: GameMetadata,
	allowedTileTypes: TileType[]
): Tile {
	let result = null;
	let baseRange = range;
	while(!result){
		const tiles = getTiles(baseLocationTile, baseRange, gameMetadata);
		const availableTiles = tiles.filter(tile => allowedTileTypes.some(tileType => tileType === tile.tileType));
		
		if(availableTiles.length > 0){
			const selectedTileIndex = Math.floor((Math.random() * availableTiles.length));
			result = availableTiles[selectedTileIndex];
		}
		baseRange++;
	}
	return result;
}

export function getTilesByTileTypes(
	gameMetadata: GameMetadata,
	tileTypes: TileType[]
): Tile[] {
	let result = [];
	for (let key in gameMetadata.tiles) {
		const tile = gameMetadata.tiles[key];

		if (tileTypes.some(tileType => tileType === tile.tileType)) {
			result.push(tile);
		}
	}
	return result;
}

export function getSingleRandomTile(
	gameMetadata: GameMetadata,
	...tileTypes: TileType[]
): Tile {
	const targetTiles = getTilesByTileTypes(gameMetadata, tileTypes);
	const index = Math.floor((Math.random() * targetTiles.length) + 1);
	const result = targetTiles[index];
	return result;
}

export function getTiles(
	fromTile: Tile, 
	range: number,
	gameMetadata: GameMetadata
): Tile[] {
	const result = [];
	const startX = fromTile.x - range;
	const startY = fromTile.y - range;
	const stopX = fromTile.x + range;
	const stopY = fromTile.y + range;

	for (let y = startY; y <= stopY; y++) {
		for (let x = startX; x <= stopX; x++) {
			const tile = getTile(gameMetadata, x, y);
			if(tile){
				result.push(tile);
			}
		}
	}

	return result;
} 