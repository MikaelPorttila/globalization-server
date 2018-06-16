import { GameAttribute, Direction, GameStat } from "../../lib/constants";
import { GameMetadata, getTile } from "../game-Metadata";
import { entityCanStandOnTile } from "../rules/tile.rule";
import GameEntity from "../entities/game-entity";

export default function moveEntity(entity: GameEntity, actionMetadata: string[], gameMetadata: GameMetadata) {

	if (!entity || !actionMetadata || actionMetadata.length < 1 || entity.attributes.some(attr => attr == GameAttribute.Movable)) {
		return;
	}

	let newPositionX = entity.x;
	let newPositionY = entity.y;
	let movementTotCost = 0;
	const entityMovementSpeed = entity.stats[GameStat.MovementSpeed];

	const path = actionMetadata.map(rawDir => {
		const dir = <Direction>parseInt(rawDir);

		switch (dir) {
			case Direction.Up:
				newPositionY--;
				break;
			case Direction.Down:
				newPositionY++;
				break;
			case Direction.Right:
				newPositionX++;
				break;
			case Direction.Left:
				newPositionY++;
				break;
		}

		const tile = getTile(gameMetadata, newPositionX, newPositionY);
		//TODO:(Mikael) compute the movement cost for the entity on this tile
		movementTotCost++;

		return {
			x: newPositionX,
			y: newPositionY,
			tile: tile
		};
	});

	if (entityMovementSpeed >= movementTotCost && path.some(m => !entityCanStandOnTile(entity, m.tile))) {
		entity.x = newPositionX;
		entity.y = newPositionY;
	}
}