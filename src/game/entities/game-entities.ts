import GameEntity from "./game-entity";
import { EntityType, GameAttribute, GameStat } from "../../lib/constants";
import guid from "../../lib/guid";

export function spawnEntity(
	entityType: EntityType,
	userId: string,
	x: number,
	y: number
): GameEntity {
	const result = new GameEntity();
	result.entityId = guid();
	result.entityType = entityType;
	result.ownerId = userId;
	result.stats = {};
	result.attributes = [];
	result.x = x;
	result.y = y;

	switch (entityType) {
		case EntityType.Town:
			result.attributes = [GameAttribute.Structure];
			result.stats[GameStat.Health] = 100;
			result.stats[GameStat.Defence] = 10;
			result.stats[GameStat.RangeAttack] = 5;
			break;
		case EntityType.Worker:
			result.attributes = [GameAttribute.Movable, GameAttribute.LandUnit];
			result.stats[GameStat.MovementSpeed] = 2;
			result.stats[GameStat.Defence] = 1;
			result.stats[GameStat.Attack] = 1;
			result.stats[GameStat.RangeAttack] = 0;
			result.stats[GameStat.Health] = 10;
			break;
		case EntityType.Scout:
			result.attributes = [GameAttribute.Movable, GameAttribute.LandUnit];
			result.stats[GameStat.MovementSpeed] = 4;
			result.stats[GameStat.Defence] = 1;
			result.stats[GameStat.Attack] = 2;
			result.stats[GameStat.RangeAttack] = 0;
			result.stats[GameStat.Health] = 10;
			break;
	}

	return result;
}