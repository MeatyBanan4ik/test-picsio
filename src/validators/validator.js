/**
 * external libs
 */
import Validator from 'validatorjs';

export default class AbstractValidator {
	constructor(data) {
		this.data = data;
	}

	get rules() {
		throw new Error('abstract getter');
	}

	validate(passes, fails) {
		const validation = new Validator(this.data, this.rules);
		validation.checkAsync(passes, () => {
			if (fails) fails(validation.errors);
		});
	}
}
