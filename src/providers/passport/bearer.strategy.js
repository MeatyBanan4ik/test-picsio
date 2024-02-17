/**
 * external libs
 */
import jwt from 'jsonwebtoken';

/**
 * internal configs
 */
import config from '../../../config/config.js';

/**
 * internal models
 */
import UserModel from '../../db/models/user.model.js';

/**
 * internal exceptions
 */
import UnknownException from '../../exceptions/unknown.exception.js';
import UnauthorizedException from '../../exceptions/unauthorized.exception.js';

/**
 * internal middlewares
 */
import { parseAuthorizationHeader } from '../../handlers/http/middlewares/authenticate.http.middleware.js';

/**
 * internal constants
 */
import { SCHEMES } from '../../constants/auth.constants.js';

/**
 * internal strategies
 */
import Strategy from './strategy.js';

export class BearerStrategy extends Strategy {
	name = SCHEMES.bearer;

	authenticate(req) {
		const { authorization } = req.headers;

		const { value } = parseAuthorizationHeader(authorization);

		const verified = (err, user, info) => {
			if (err) return this.error(err);

			return this.success(user, info);
		};

		this.verify(value, verified);
	}
}

export const bearerStrategyHandler = () =>
	new BearerStrategy(async (token, next) => {
		try {
			const { id } = jwt.verify(token, config.env.appKey);
			const userModel = await UserModel.findById(id);

			if (userModel === null) {
				throw new UnknownException();
			}

			next(null, userModel, {});
		} catch (e) {
			next(new UnauthorizedException(), false);
		}
	});
