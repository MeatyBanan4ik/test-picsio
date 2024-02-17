/**
 * internal validators
 */
import SendEventValidator from '../../../../validators/event/send.validator.js';

export default class SendEventHttpValidator extends SendEventValidator {
	constructor(req) {
		super({ ...req.body });
	}
}
