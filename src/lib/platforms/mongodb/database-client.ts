import * as MongoClient from 'mongodb';
import { Collection } from 'mongodb';
import { connect } from 'mongoose';

export default class DatabaseClient {

	private ip: string;
	private port: string | number;
	public options: MongoClient.MongoClientOptions;
	public serverUrl: string;

	constructor() {
		this.ip = process.env.MongoIp || 'localhost';
		this.port = process.env.MongoPort || 27017;
		this.serverUrl = this.getConnectionString();
		this.options = <MongoClient.MongoClientOptions>{
			useNewUrlParser: true
		};
	}

	async testConnection(): Promise<void> {
		const url = this.getConnectionString();
		await connect(url)
			.then(() => console.log('connected!'))
			.catch((err) => console.log(err));
	}

	private getConnectionString(): string {
		return `mongodb://${this.ip}:${this.port}/glob`;
	}
}