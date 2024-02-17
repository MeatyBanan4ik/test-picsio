/**
 * external libs
 */
import Validator from 'validatorjs';

/**
 * internal validators
 */
import uniqueValidator from './validators/unique.validator.js';

export default () => {
	Validator.registerAsync('unique', uniqueValidator, 'The :attribute has already been taken.');
};
