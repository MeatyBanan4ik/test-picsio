/**
 * internal validators
 */
import RefreshValidator from '../../../../validators/auth/refresh.validator.js';

export default class RefreshHttpValidator extends RefreshValidator {
	constructor(req) {
		super(req.body);
	}
}
