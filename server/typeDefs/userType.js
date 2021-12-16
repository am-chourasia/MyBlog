import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: ID!
		fullName: String!
		email: String!
		password: String!
		createdAt: String!
	}
	input LoginInput {
		email: String!
		password: String!
	}
	input RegisterInput {
		fullName: String!
		email: String!
		password: String!
	}
	type RegistrationSuccessful {
		user: User!
	}
	type LoginSuccessful {
		accessToken: String!
		refreshToken: String!
	}
	type SigningUnsuccessful {
		errors: [Error!]!
	}
	union RegisterResponse = RegistrationSuccessful | SigningUnsuccessful
	union LoginResponse = LoginSuccessful | SigningUnsuccessful

	extend type Query {
		currentUser: User! @auth
	}
	extend type Mutation {
		registerUser(input: RegisterInput!): RegisterResponse!
		loginUser(input: LoginInput): LoginResponse!
	}
`;
