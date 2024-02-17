/**
 * external libs
 */
import vm from 'vm';

/**
 * internal strategies
 */
import Strategy from './strategy.js';

/**
 * internal helpers
 */
import { getUniqueFlatArr } from '../../helpers/arr.helpers.js';

export default class ClientStrategy extends Strategy {
	constructor(funcString = '') {
		super();
		this.funcString = funcString;
	}

	async getDestinations(possibleDestinations = []) {
		const context = {};

		vm.createContext(context);

		const func = vm.runInContext(this.funcString, context);

		if (func(possibleDestinations)) {
			return getUniqueFlatArr(possibleDestinations);
		}

		return [];
	}
}
