import Tile from "./Tile";

import { TileType } from "../lib/constants";
import Tiles from "../lib/types/tiles";

export class GameMetadata {
	mapHeight: number;
	mapWidth: number;
	tiles: Tiles;
}

export function getTile(gameMetadata: GameMetadata, x: number, y: number): Tile {
	const result = gameMetadata.tiles[x + "-" + y];
	return result;
}

export function setTile(gameMetadata: GameMetadata, x: number, y: number, tileType: TileType): void {
	const tile = new Tile();
	tile.x = x;
	tile.y = y;
	tile.tileId = x + "-" + y;
	tile.tileType = tileType;

	gameMetadata.tiles[tile.tileId] = tile;
}

export function getTilesByTileTypes(gameMetadata: GameMetadata, tileTypes: TileType[]): Tile[] {
	let result = [];
	for (let key in gameMetadata.tiles) {
		const tile = gameMetadata.tiles[key];

		if (tileTypes.some(tileType => tileType === tile.tileType)) {
			result.push(tile);
		}
	}
	return result;
}

export function getSingleRandomTile(gameMetadata: GameMetadata, ...tileTypes: TileType[]): Tile {
	const targetTiles = getTilesByTileTypes(gameMetadata, tileTypes);
	const index = Math.floor((Math.random() * targetTiles.length) + 1);
	const result = targetTiles[index];
	return result;
}
