import { GameMetadata, setTile } from "../game-metadata";
import { WorldSize, WorldType, TileType } from "../../lib/constants";

export function generateWorld(worldSize: WorldSize, worldType: WorldType): GameMetadata {
	const result = new GameMetadata();
	result.tiles = {};

	let tileWidthAndHeight = 0;
	switch (worldSize) {
		case WorldSize.Small:
			tileWidthAndHeight = 20;
			break;

		case WorldSize.Medium:
			tileWidthAndHeight = 30;
			break;

		case WorldSize.Large:
			tileWidthAndHeight = 45;
			break;
	}

	result.mapHeight = tileWidthAndHeight;
	result.mapWidth = tileWidthAndHeight;

	const tileTypeRangeBuilder = new TileTypeRangeBuilder();
	switch (worldType) {
		case WorldType.Baltic:
			tileTypeRangeBuilder.add(TileType.Water, 65);
			tileTypeRangeBuilder.add(TileType.Ground, 25);
			tileTypeRangeBuilder.add(TileType.Woods, 5);
			tileTypeRangeBuilder.add(TileType.Mountain, 5);
			break;

		case WorldType.Highland:
			tileTypeRangeBuilder.add(TileType.Ground, 70);
			tileTypeRangeBuilder.add(TileType.Water, 10);
			tileTypeRangeBuilder.add(TileType.Woods, 10);
			tileTypeRangeBuilder.add(TileType.Mountain, 10);
			break;

		//TODO: (Mikael) Force groups of tiles to be generated on 
		// random spots as land and make the rest water.
		// then ran the the tile type % over those land tiles. 
		case WorldType.Islands:
			tileTypeRangeBuilder.add(TileType.Ground, 70);
			tileTypeRangeBuilder.add(TileType.Water, 10);
			tileTypeRangeBuilder.add(TileType.Woods, 10);
			tileTypeRangeBuilder.add(TileType.Mountain, 10);
			break;
	}

	for (let x = 0; x < tileWidthAndHeight; x++) {
		for (let y = 0; y < tileWidthAndHeight; y++) {
			const randomVal = Math.floor((Math.random() * tileTypeRangeBuilder.counter) + 1);
			const tileType = tileTypeRangeBuilder.getTileType(randomVal);
			setTile(result, x, y, tileType);
		}
	}
	return result;
}

class TileTypeRangeBuilder {
	counter: number;
	private ranges: TileTypeRange[] = [];

	constructor(){
		this.counter = 0;
	}

	add(tileType: TileType, rangeLength: number): void {

		if (rangeLength === 0) {
			return;
		}

		const tileTypeRange = new TileTypeRange();
		tileTypeRange.start = ++this.counter;
		tileTypeRange.stop = this.counter + (rangeLength - 1);
		tileTypeRange.tileType = tileType;
		this.ranges.push(tileTypeRange);
		this.counter = tileTypeRange.stop;
	}

	getTileType(value: number): TileType {
		const result = this.ranges.find(r => r.start <= value && r.stop >= value).tileType;
		return result;
	}
}

class TileTypeRange {
	start: number;
	stop: number;
	tileType: TileType;
}