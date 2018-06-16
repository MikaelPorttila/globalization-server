import { EntityType } from "../../lib/constants";
import GameStats from "../../lib/types/game-stats";

export default class EntitySnapshot {
	x: number;
	y: number;
	entityId: string;
	ownerId: string;
	entityType: EntityType;
	stats: GameStats;
}