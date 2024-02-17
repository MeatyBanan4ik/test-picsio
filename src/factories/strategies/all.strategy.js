/**
 * internal strategies
 */
import Strategy from './strategy.js';

/**
 * internal helpers
 */
import { getUniqueFlatArr } from '../../helpers/arr.helpers.js';

export default class AllStrategy extends Strategy {
	async getDestinations(possibleDestinations = []) {
		const uniqueFlatArr = getUniqueFlatArr(possibleDestinations);

		return possibleDestinations.reduce((arr, destination) => {
			const falseArr = Object.keys(destination).filter(key => !destination[key]);

			return arr.filter(item => !falseArr.includes(item));
		}, uniqueFlatArr);
	}
}
