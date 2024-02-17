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
		got(destination.url, {
			method: this.method,
			[this.method === 'get' ? 'searchParams' : 'json']: payload,
			throwHttpErrors: false,
		});
	}
}
