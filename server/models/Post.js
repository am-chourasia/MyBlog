import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	tags: [{ type: String }],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	createdAt: {
		type: Date,
		date: Date.now(),
	},
});

export default mongoose.model("post", PostSchema);
