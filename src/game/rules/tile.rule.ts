import GameEntity from "../entities/game-entity";
import Tile from "../tile";
import { TileType, GameAttribute } from "../../lib/constants";

export function entityCanStandOnTile(entity: GameEntity, tile: Tile): boolean {

	let result = false;
	
	switch(tile.tileType){
		case TileType.Ground:
			result = entity.attributes.some(attr => 
				attr === GameAttribute.LandUnit ||
				attr === GameAttribute.AirUnit);
		break;
		case TileType.Water:
			result = entity.attributes.some(attr => 
				attr === GameAttribute.WaterUnit ||
				attr === GameAttribute.AirUnit);
		break;
		case TileType.Mountain:
			result = entity.attributes.some(attr => 
				attr === GameAttribute.AirUnit || 
				attr === GameAttribute.LandUnit);
		break;
	}

	return result;
}