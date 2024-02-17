/**
 * external libs
 */
import log4js from 'log4js';

/**
 * internal configs
 */
import config from '../../config/config.js';

/**
 * internal factories
 */
import StrategyFactory from '../factories/strategy.factory.js';
import TransportFactory from '../factories/transport.factory.js';

/**
 * internal helpers
 */
import { getUniqueFlatArr } from '../helpers/array.helpers.js';

const logger = log4js.getLogger('EventService');

export default class PostService {
	/**
	 * @param possibleDestinations {String[]}
	 * @param payload {Object}
	 * @param strategy {String | undefined}
	 * @returns {Promise<Array>}
	 */
	async send(possibleDestinations = [], payload = {}, strategy = '') {
		const Strategy = new StrategyFactory(strategy);

		const destinations = await Strategy.getDestinations(possibleDestinations);

		const sentDestinationsArr = await this.sendToDestinations(destinations, payload);

		const sentDestinations = Object.assign({}, ...sentDestinationsArr);

		const allFlatUniqueDestinations = getUniqueFlatArr(possibleDestinations);

		return allFlatUniqueDestinations.reduce(
			(obj, dest) => ({
				...obj,
				[dest]: dest in sentDestinations ? sentDestinations[dest] : false,
			}),
			{},
		);
	}

	/**
	 *
	 * @param destinations {String[]}
	 * @param payload {Object}
	 * @returns {Promise<Awaited<Object>[]>}
	 */
	async sendToDestinations(destinations = [], payload = {}) {
		return Promise.all(
			destinations.map(async destination => {
				const destinationModel = config.defaultDestinations.find(item => item.name === destination);

				if (!destinationModel) {
					logger.error(`UnknownDestinationError(${destination})`);
					return { [destination]: false };
				}

				const Transport = new TransportFactory(destinationModel.transport);

				try {
					await Transport.send(destinationModel, payload);
				} catch (e) {
					logger.error(e.toString());

					return { [destination]: false };
				}

				return { [destination]: true };
			}),
		);
	}
}
