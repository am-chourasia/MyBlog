process.env.NODE_ENV = process.env.NODE_ENV || "development";
export default {
	port: process.env.PORT,
	mongoUri: process.env.MONGO_URI,
	accessKey: process.env.ACCESS_KEY,
	refreshKey: process.env.REFRESH_KEY,
};
