/**
 * external libs
 */
import logger from 'log4js';
import Mongoose from 'mongoose';

/**
 * internal configs
 */
import config from '../config/config.js';

/**
 * internal servers
 */
import httpServer from './http-server.js';

/**
 * internal providers
 */
import validatorProvider from './providers/validator.provider.js';

async function init() {
	const schema = 1;
	// check config version
	if (config.version !== schema) {
		console.error('Unsupported configuration version:', config.version, 'actual:', schema);
		process.exit(-1);
	}
	logger.configure(config.logger);
	await Mongoose.connect(config.db);
	validatorProvider();
	await httpServer.up(config.http.port, config.http.host);
}

init();
