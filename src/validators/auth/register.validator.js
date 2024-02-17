/**
 * internal validators
 */
import Validator from '../validator.js';

export default class RegisterValidator extends Validator {
	rules = {
		name: 'required',
		email: 'required|email|unique:users,email',
		password: 'required',
	};
}
