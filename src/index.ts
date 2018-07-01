import Server from './lib/server';
import { Bootstrapper } from './bootstrapper';
import config from './config';

config.setup();
const serverInstance = new Bootstrapper(new Server());