import { Document, Schema, Model, model } from "mongoose";

export async function createOrUpdateMongo(
	model: Model<Document>, 
	searchField: any, 
	updateModel: any
) : Promise<void>{
	await model.findOneAndUpdate(searchField, updateModel, { upsert: true, setDefaultsOnInsert: true });
}