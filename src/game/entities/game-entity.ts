import { GameAttribute, EntityType } from "../../lib/constants";
import GameStats from "../../lib/types/game-stats";

export default class GameEntity {
	entityId: string;
	ownerId: string;
	entityType: EntityType;
	attributes: GameAttribute[];
	stats: GameStats;
	x: number;
	y: number;
}