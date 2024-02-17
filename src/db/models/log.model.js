/**
 * external libs
 */
import { Schema, model } from 'mongoose';

const schema = new Schema(
	{
		method: { type: String, required: true },
		url: { type: String, required: true },
		request: { type: Object, required: false },
		response: { type: Object, required: false },
	},
	{
		timestamps: true,
	},
);

export default model('Log', schema);
