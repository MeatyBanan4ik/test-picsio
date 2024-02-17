/**
 * external libs
 */
import jwt from 'jsonwebtoken';

/**
 * internal configs
 */
import config from '../../config/config.js';

/**
 * internal models
 */
import UserModel from '../db/models/user.model.js';

/**
 * internal exceptions
 */
import LoginException from '../exceptions/login.exception.js';

export default class AuthService {
	async login(email, password) {
		const userModel = await UserModel.findByEmail(email);

		if (userModel === null || (await userModel.validPassword(password)) === false) {
			throw new LoginException();
		}

		return userModel.generateBearerTokens();
	}

	async register(name, email, password) {
		return UserModel.create({ name, email, password });
	}

	async refresh(refreshToken) {
		const { email } = jwt.verify(refreshToken, config.env.appKey);

		const userModel = await UserModel.findByEmail(email);

		return userModel.generateBearerTokens();
	}
}
