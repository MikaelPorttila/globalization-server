export enum GameActionType {
	Move = 0,
	Buy = 1,
	Learn = 2,
	Trade = 3,
	CompleteTurn = 4
}

export enum GameAttribute {
	Movable = 0,
	LandUnit = 1,
	WaterUnit = 20,
	AirUnit = 30
} 

export enum GameStat {
	MovementSpeed = 0,
	Attack = 10,
	RangeAttack = 11,
	Defence = 20,
	Health = 30
}

export enum Direction {
	Up = 0,
	Right = 2,
	Down = 4,
	Left = 6
}

export enum TileType {
	Water = 0,
	Ground = 1,
	Mountain = 2,
	Woods = 3
}

export enum WorldSize {
	Small = 0,
	Medium = 1,
	Large = 2
}

export enum WorldType {
	Highland = 0,
	Islands = 1,
	Baltic = 2
} 

export enum EntityType {
	Town = 0,
	Worker = 1
}

export enum StoragePlatform {
	MongoDB = 0,
	AzureTableStorage = 1
}