/**
 * external libs
 */
import log4js from 'log4js';
import express from 'express';
import passport from 'passport';

/**
 * internal routes
 */
import ApiRoute from './routes/api.route.js';

/**
 * internal exceptions
 */
import NotFoundException from './exceptions/notFound.exception.js';

/**
 * internal providers
 */
import PassportProvider from './providers/passport.provider.js';

/**
 * internal services
 */
import LogService from './services/log.service.js';

const logger = log4js.getLogger('HttpServer');

export default class HttpServer {
	static async up(port, host) {
		this.port = port;
		this.host = host;

		// init log service

		this.logService = new LogService();
		// init a http server
		this.app = express();
		this.app.set('trust proxy', true);
		// passport init
		PassportProvider();
		// add the settings
		this._useCors();
		this._useRequestParsers();
		this._useRequestTrace();
		this._useResponseTrace();
		// add routes
		this._useRoutes();
		// add error handling
		this._useErrorHandling();
		// listen to the http host and port
		await new Promise(res => {
			this.listen = this.app.listen(this.port, this.host, () => {
				logger.info(`App listening on ${this.host}:${this.port}!`);
				res(true);
			});
		});
	}

	static _useCors() {
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Max-Age', '600');
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
			res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

			if (req.method === 'OPTIONS') {
				return res.send();
			}

			return next();
		});
	}

	static _useRequestParsers() {
		this.app.use(passport.initialize());
		this.app.use(express.json());
	}

	static _useRequestTrace() {
		this.app.use(async (req, res, next) => {
			req._startTime = Date.now();

			const logModel = await this.logService.create({
				method: req.method,
				url: req.url,
				request: {
					body: req.body,
					query: req.query,
					params: req.params,
				},
			});

			req._id = logModel._id;

			res.setHeader('X-Request-Id', logModel._id);
			logger.info(
				req._id.toString(),
				'REQUEST',
				'method:',
				req.method,
				'url:',
				req.url,
				'body:',
				req.body,
				'query:',
				req.query,
			);
			next();
		});
	}

	static _useResponseTrace() {
		this.app.use((req, res, next) => {
			const { json } = res;

			res._success = function (successResponse = {}) {
				const { data = {}, code = 200 } = successResponse;

				this.logService.update(req._id, { response: { body: data, code: Number(code) } });

				res.status(code).send(data);
			}.bind(this);

			res.json = function (body) {
				logger.info(req._id.toString(), 'RESPONSE', 'code:', res.statusCode, 'body:', body);
				json.apply(res, [body]);
			};

			next();
		});
	}

	static _useRoutes() {
		// user`s routes
		this.app.use('/api', ApiRoute);
		// catch 404 and forward
		this.app.use(() => {
			throw new NotFoundException();
		});
	}

	static _useErrorHandling() {
		this.app.use((err, req, res, _next) => {
			const code = err.status || 500;
			const { errors } = err;
			const { message } = err;
			const body = { errors, message };

			this.logService.update(req._id, { response: { body, code: Number(code) } });

			res.status(code).send({
				errors,
				message,
			});
		});
	}
}
