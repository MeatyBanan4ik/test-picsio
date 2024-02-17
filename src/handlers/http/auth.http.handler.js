/**
 * internal services
 */
import AuthService from '../../services/auth.service.js';

export default class AuthHttpHandler {
	constructor() {
		this.service = new AuthService();
	}

	async login(req, res) {
		const { email, password } = req._validated;

		res._success({ data: await this.service.login(email, password) });
	}

	async register(req, res) {
		const { name, email, password } = req._validated;

		await this.service.register(name, email, password);

		res._success({
			data: {
				message: 'Registration completed successfully.',
			},
		});
	}

	async refresh(req, res) {
		const { refresh_token: refreshToken } = req._validated;

		res._success({ data: await this.service.refresh(refreshToken) });
	}
}
