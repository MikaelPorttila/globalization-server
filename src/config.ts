import * as dotenv from 'dotenv';
import { StoragePlatform } from './lib/constants';

class AppConfig {
	private isDebug: boolean = true;

	constructor() {
		this.isDebug = process.env.NODE_ENV !== "Production";
		if (this.isDebug) {
			process.env.IS_DEBUG = "true";
		}
	}

	public setup(): void {

		if (this.isDebug) {
			dotenv.load();
		}

		Object.assign(process.env, {
			PORT: process.env.PORT || 3000,
			STORAGE_PLATFORM: process.env.STORAGE_PLATFORM || StoragePlatform.MongoDB,
			MONGO_DB_IP: process.env.MONGO_DB_IP || "localhost",
			MONGO_DB_PORT: process.env.MONGO_DB_PORT || 27017,
			APPLICATION_NAME: process.env.APPLICATION_NAME || "Globalization",
			NODE_ENV: process.env.NODE_ENV || "Development",
			AZURE_STORAGE_URL: process.env.AZURE_STORAGE_URL || ""
		});

		if(this.isDebug){
			console.log('Debug mode active');
			console.log('AppConfig invoked');
			console.log('App name: ' + process.env.APPLICATION_NAME);
			console.log('env: ' + process.env.NODE_ENV);
		}
	}
}

const config = new AppConfig;
export default config;
