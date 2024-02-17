/**
 * internal exceptions
 */
import ValidationException from '../../../exceptions/validation.exception.js';

export default Valiadtor => (req, res, next) => {
	const validator = new Valiadtor(req);

	req._validated = Object.keys(validator.rules).reduce((a, c) => ({ ...a, [c]: validator.data[c] }), {});

	validator.validate(next, errors => next(new ValidationException(errors)));
};
