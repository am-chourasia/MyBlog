const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		date: Date.now(),
	},
});

module.exports = mongoose.model("tag", TagSchema);
