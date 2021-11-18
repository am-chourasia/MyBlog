process.env.NODE_ENV = process.env.NODE_ENV || "development";
module.exports = {
	port: process.env.PORT,
	mongoUri: process.env.MONGO_URI,
};
