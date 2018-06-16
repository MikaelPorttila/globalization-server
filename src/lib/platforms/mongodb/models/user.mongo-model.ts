import { Document, Schema, Model, model } from "mongoose";
import { User } from "../../../entities/user";
import { createOrUpdateMongo } from "../helpers/mongo-helpers";

interface IUserMongoModel {
	userId: string;
	name: string;
	mail: String;
	passwordHash: String;
	lastActive: Date | null,
	accountActivated: Boolean,
	accountActivationCode: String
}

interface IUserMongoModelDocument extends IUserMongoModel, Document { }
const UserSchema = new Schema({
	userId: String,
	name: String,
	mail: String,
	passwordHash: String,
	lastActive: Date,
	accountActivated: Boolean,
	accountActivationCode: String
});

const UserMongoModel: Model<IUserMongoModelDocument> = model<IUserMongoModelDocument>("User", UserSchema);

export function mapToUserMongoModel(user: User): IUserMongoModel {
	const result = <IUserMongoModel>{};
	result.userId = user.id;
	result.name = user.name;
	result.mail = user.mail;
	result.passwordHash = user.passwordHash;
	result.lastActive = user.lastActive;
	result.accountActivated = user.accountActivated;
	result.accountActivationCode = user.accountActivationCode;
	return result;
}

export function toUserModel(userMongoModel: IUserMongoModelDocument): User {
	const result = new User;
	result.id = userMongoModel.userId;
	result.name = userMongoModel.name;
	result.mail = userMongoModel.mail.toString();
	result.passwordHash = userMongoModel.passwordHash.toString();
	result.lastActive = userMongoModel.lastActive;
	result.accountActivated = userMongoModel.accountActivated;
	result.accountActivationCode = userMongoModel.accountActivationCode;
	return result;
}

export async function mongoGetUserById(userId: string): Promise<User> {
	let result: User;
	const findResult = await UserMongoModel.findOne({ userId });
	if (findResult) {
		result = toUserModel(findResult);
	}
	return result;
}

export async function mongoStoreUser(user: User): Promise<void> {
	const userMongoModel = mapToUserMongoModel(user);
	const userId = user.id;
	await createOrUpdateMongo(UserMongoModel, { userId }, userMongoModel);
}