/**
 * internal validators
 */
import Validator from '../validator.js';

export default class LoginValidator extends Validator {
	rules = {
		email: 'required|email',
		password: 'required',
	};
}
