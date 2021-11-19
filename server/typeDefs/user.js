const { gql } = require("apollo-server-express");

const user = gql`
	extend type Query {
		currentUser: User!
	}
	extend type Mutation {
		registerUser(
			fullname: String!
			email: String!
			password: String!
		): RegisterResponse!
		login(email: String!, password: String!): LogInResponse
	}
	type RegisterResponse {
		ok: Boolean!
		use: User
		error: [Error!]
	}
	type LogInResponse {
		ok: Boolean!
		accessToken: String!
		refreshToken: String!
		error: [Error!]
	}
	type User {
		id: ID!
		email: String!
		password: String!
		createdAt: String!
	}
`;

module.exports = user;
