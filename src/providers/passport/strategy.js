/**
 * external libs
 */
import { Strategy } from 'passport';

export default class AbstractStrategy extends Strategy {
	constructor(verify) {
		super();
		this.verify = verify;
	}

	get name() {
		throw new Error('abstract method');
	}

	authenticate(_req, _res, _next) {
		throw new Error('abstract method');
	}
}
