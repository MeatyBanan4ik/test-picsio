/**
 * external libs
 */
import { Schema, model } from 'mongoose';

const schema = new Schema(
	{
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: false, trim: true },
		content: { type: String, required: false, trim: true },
	},
	{
		timestamps: true,
	},
);

export default model('Post', schema);
