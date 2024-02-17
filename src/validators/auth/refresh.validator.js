/**
 * internal validators
 */
import Validator from '../validator.js';

export default class RefreshValidator extends Validator {
	rules = {
		refresh_token: 'required',
	};
}
