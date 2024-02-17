/**
 * internal validators
 */
import Validator from '../validator.js';

export default class SendEventValidator extends Validator {
	rules = {
		payload: 'required',
		possibleDestinations: 'required|array',
		'possibleDestinations.*.*': 'boolean',
		strategy: 'string',
	};
}
