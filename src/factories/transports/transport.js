export default class Transport {
	constructor(method = '') {
		this.method = method;
	}

	async send(_destination, _payload = {}) {
		throw new Error('abstract method');
	}
}
