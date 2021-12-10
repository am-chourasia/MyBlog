import express from "express";
import cors from "cors";
import databaseConnector from "./helpers/database.js";
import { checkAuthHeaders } from "./helpers/auth.js";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import AuthDirectiveTransformer from "./directives/authDirective.js";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";

const main = async () => {
	console.clear();
	const app = express();
	app.use(cors());
	console.log("Connecting to the database ...");
	await databaseConnector();

	let schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});
	schema = AuthDirectiveTransformer(schema, "auth");
	const server = new ApolloServer({
		schema,
		context: async ({ req, res }) => {
			return await checkAuthHeaders({ req, res });
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
