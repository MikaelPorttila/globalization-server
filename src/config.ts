import * as dotenv from 'dotenv';

class AppConfig {
	private isDebug: boolean = true;
	
	constructor() {
		this.isDebug = process.env.NODE_ENV !== "Production";
		if(this.isDebug){
			process.env.IS_DEBUG = "true";	
		}
	}

	public setup(): void {
		if(this.isDebug){
			dotenv.load();
			console.log('Debug mode active');
			console.log('AppConfig invoked');
			console.log('App name: ' + process.env.APPLICATION_NAME);
			console.log('env: ' + process.env.NODE_ENV);
		}
	}
}

const config = new AppConfig;
export default config;
