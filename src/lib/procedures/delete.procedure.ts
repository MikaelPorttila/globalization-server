import { deleteGameInstance, deleteSnapshot } from "../platforms/storage";

export async function deleteGameAndLobbyProcedure(gameId: string): Promise<void> {
	await deleteGameInstance(gameId);
	await deleteSnapshot(gameId);
}