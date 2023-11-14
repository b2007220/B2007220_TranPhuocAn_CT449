const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const customerService = require('../services/customer.service');

class AuthController {
	async loginWithIdToken(req, res, next) {
		try {
			res.send(await authService.signInWithIdToken(req.body.token));
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			res.send(await authService.login(req.body));
		} catch (error) {
			next(error);
		}
	}

	async getProfile(req, res, next) {
		try {
			res.send(req.user);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthController();
