/**
 * internal services
 */
import Service from './service.js';

/**
 * internal models
 */
import LogModel from '../db/models/log.model.js';

export default class LogService extends Service {
	constructor() {
		super(LogModel);
	}
}
