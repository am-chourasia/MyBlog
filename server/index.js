const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();
// The GraphQL schema
const typeDefs = gql`
	type Query {
		"A simple type for getting started!"
		hello: String
	}
`;

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		hello: () => "world",
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
});

server
	.start()
	.then(() => {
		server.applyMiddleware({ app });
		app.listen({ port: 4000 }, () => {
			console.log(`🚀 Server ready at http://localhost:4000`);
		});
	})
	.catch((e) => console.log("Error starting the server"));
