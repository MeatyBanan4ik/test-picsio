/**
 * internal validators
 */
import RegisterValidator from '../../../../validators/auth/register.validator.js';

export default class RegisterHttpValidator extends RegisterValidator {
	constructor(req) {
		super(req.body);
	}
}
