/**
 * internal configs
 */
import config from '../../config/config.js';

/**
 * internal constants
 */
import { STRATEGIES } from '../constants/event.constants.js';

/**
 * internal strategies
 */
import AllStrategy from './strategies/all.strategy.js';
import AnyStrategy from './strategies/any.strategy.js';
import ClientStrategy from './strategies/client.strategy.js';

export default class StrategyFactory {
	constructor(type = '') {
		switch (type || config.defaultStrategy) {
			case STRATEGIES.ALL:
				return new AllStrategy();
			case STRATEGIES.ANY:
				return new AnyStrategy();
			default:
				return new ClientStrategy(type);
		}
	}
}
