import * as dotenv from 'dotenv';
import { StoragePlatform } from './lib/constants';

class AppConfig {

	constructor() {

		if (process.env.IS_DEBUG) {
			throw "Please don't set the IS_DEBUG process.env variable, use the NODE_ENV variable instead and set it to another value than 'Production'";
		}

		if (process.env.NODE_ENV !== "Production") {
			process.env.IS_DEBUG = "true";
		}
	}

	public setup(): void {

		if (process.env.IS_DEBUG) {
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

		if (process.env.IS_DEBUG) {
			console.log('Debug mode active');
			console.log('AppConfig invoked');
			console.log('App name: ' + process.env.APPLICATION_NAME);
			console.log('env: ' + process.env.NODE_ENV);
		}
	}
}

const config = new AppConfig;
export default config;
