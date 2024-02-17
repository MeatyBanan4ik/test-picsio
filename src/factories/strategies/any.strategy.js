/**
 * internal strategies
 */
import Strategy from './strategy.js';

export default class AnyStrategy extends Strategy {
	async getDestinations(possibleDestinations = []) {
		const setDestinations = possibleDestinations.reduce((setArr, destination) => {
			const trueArr = Object.keys(destination).filter(key => destination[key]);

			trueArr.forEach(setArr.add, setArr);

			return setArr;
		}, new Set());

		return Array.from(setDestinations);
	}
}
