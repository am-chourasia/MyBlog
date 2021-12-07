import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import databaseConnector from "./helpers/database.js";
import config from "./config.js";
import { User } from "./models/index.js";
import { checkAuthHeaders } from "./helpers/auth.js";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";

const main = async () => {
	console.clear();
	const app = express();
	app.use(cors());
	console.log("Connecting to the database ...");
	await databaseConnector();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req, res }) => {
			const ret = await checkAuthHeaders({ req, res });
			return ret;
		},
	});
	await server.start();

	server.applyMiddleware({ app });
	app.listen({ port: process.env.PORT }, () => {
		console.log(
			`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}/graphql`
		);
	});
};

main().catch((error) => {
	console.error("Error starting the server : \n" + error);
});
