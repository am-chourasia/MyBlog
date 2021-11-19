const mongoose = require("mongoose");

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

module.exports = mongoose.model("post", PostSchema);
