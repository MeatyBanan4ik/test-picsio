/**
 * external libs
 */
import got from 'got';

/**
 * internal transports
 */
import Transport from './transport.js';

export default class HttpTransport extends Transport {
	async send(destination, payload = {}) {
		const requestMethod = this.method === 'get' ? 'searchParams' : 'json';

		got(destination.url, {
			method: this.method,
			[requestMethod]: payload,
			throwHttpErrors: false,
		});
	}
}
