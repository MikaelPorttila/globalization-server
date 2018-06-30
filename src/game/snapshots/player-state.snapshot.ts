import Tile from "../tile";
import EntitySnapshot from "./entity.snapshot";

export default class PlayerStateSnapshot {
	id: string;
	gameId: string;
	userId: string;
	turnId: string;
	entities: EntitySnapshot[];
	tiles: Tile[];
}