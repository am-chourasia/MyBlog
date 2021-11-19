const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs/typeDefs");
const databaseConnection = require("./helpers/database");

(async () => {
	console.clear();
	const app = express();
	console.log("Connecting to the database ...");
	await databaseConnection();

	// A map of functions which return data for the schema.
	const resolvers = {
		Query: {
			// hello: () => "world",
		},
	};

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		playground: true,
	});

	await server.start();
	server.applyMiddleware({ app });
	app.listen({ port: process.env.PORT }, () => {
		console.log(
			`🚀 Server ready at ${process.env.HOST}:${process.env.PORT}/graphql`
		);
	});
})().catch((error) => {
	console.error("Error starting the server : " + error);
});
