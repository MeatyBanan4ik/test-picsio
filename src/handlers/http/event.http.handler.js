/**
 * internal services
 */
import EventService from '../../services/event.service.js';

export default class EventHttpHandler {
	constructor() {
		this.service = new EventService();
	}

	async send(req, res) {
		const { possibleDestinations = [], payload = {}, strategy = '' } = req._validated;

		res._success({ data: await this.service.send(possibleDestinations, payload, strategy) });
	}
}
