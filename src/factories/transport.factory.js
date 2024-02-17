/**
 * internal constants
 */
import { TRANSPORTS } from '../constants/event.constants.js';

/**
 * internal transports
 */
import HttpTransport from './transports/http.transport.js';
import ConsoleTransport from './transports/console.transport.js';

export default class TransportFactory {
	constructor(data = '') {
		const [type, method] = data.split('.');

		switch (type) {
			case TRANSPORTS.CONSOLE:
				return new ConsoleTransport(method);
			case TRANSPORTS.HTTP:
				return new HttpTransport(method);
			default:
				throw new Error(`Unknown transport type: ${type}`);
		}
	}
}
