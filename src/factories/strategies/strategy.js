export default class Strategy {
	async getDestinations(_possibleDestinations = []) {
		throw new Error('abstract method');
	}
}
