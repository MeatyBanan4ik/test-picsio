/**
 * internal transports
 */
import Transport from './transport.js';

export default class ConsoleTransport extends Transport {
	async send(destination, payload = {}) {
		console[this.method](payload);
	}
}
