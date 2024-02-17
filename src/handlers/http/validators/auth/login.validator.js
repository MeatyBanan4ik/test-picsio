/**
 * internal validators
 */
import LoginValidator from '../../../../validators/auth/login.validator.js';

export default class LoginHttpValidator extends LoginValidator {
	constructor(req) {
		super(req.body);
	}
}
