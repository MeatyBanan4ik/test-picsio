/**
 * external libs
 */
import mongoose, { Types } from 'mongoose';

export default async (value, args, attribute, passes) => {
	if (typeof args !== 'string') {
		throw new Error('Invalid unique rule, you must enter the collection.');
	}

	const [collectionName, field = '_id', expectId] = args.split(',');

	const filter = { [field]: value };

	if (expectId !== undefined) {
		filter._id = {
			$ne: new Types.ObjectId(expectId),
		};
	}

	const entity = await mongoose.connection.db.collection(collectionName).findOne(filter);

	if (entity !== null) {
		return passes(false);
	}

	return passes();
};
