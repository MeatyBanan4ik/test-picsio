/**
 * external libs
 */
import { Model, Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * internal configs
 */
import config from '../../../config/config.js';

/**
 * internal constants
 */
import { SCHEMES } from '../../constants/auth.constants.js';

const saltRounds = config.env.passwordSaltRounds;

const schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

schema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(saltRounds));
});

schema.methods.validPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

schema.methods.generateBearerTokens = function () {
	const generateToken = (expiresIn = '1h', payload = {}) =>
		jwt.sign(payload, config.env.appKey, {
			algorithm: config.env.jwtAlgorithm,
			expiresIn,
		});

	return {
		token_type: SCHEMES.bearer,
		access_token: generateToken('1h', {
			id: this._id,
			email: this.email,
		}),
		refresh_token: generateToken('7d', { email: this.email }),
	};
};

class UserClass extends Model {
	static findByEmail(email) {
		return this.findOne({ email });
	}
}

schema.loadClass(UserClass);

export default model('User', schema);
