import * as MongoClient from 'mongodb';
import { connect } from 'mongoose';

export default class DatabaseClient {

	public options: MongoClient.MongoClientOptions;
	public serverUrl: string;

	constructor() {
		this.serverUrl = `mongodb://${process.env.MONGO_DB_IP}:${process.env.MONGO_DB_PORT}/glob`;
		this.options = <MongoClient.MongoClientOptions>{
			useNewUrlParser: true
		};
	}

	async testConnection(): Promise<boolean> {
		return await connect(this.serverUrl)
			.then(() => {
				console.log('connected!');
				return true;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	}
}