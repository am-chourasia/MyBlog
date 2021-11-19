const mongoose = require("mongoose");
const config = require("../config");

module.exports = async () => {
	try {
		await mongoose.connect(config.mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("\x1b[32m%s\x1b[0m", "Connection to database successfull."); // first arg for green colour.
	} catch (error) {
		throw new Error(error.message);
	}
};
