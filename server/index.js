import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import databaseConnector from "./helpers/database.js";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import cors from "cors";

const main = async () => {
	console.clear();
	const app = express();
	app.use(cors());
	console.log("Connecting to the database ...");
	await databaseConnector();
	const server = new ApolloServer({ typeDefs, resolvers, playground: true });
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
