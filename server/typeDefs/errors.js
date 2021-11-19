const { gql } = require("apollo-server-express");

const Error = gql`
	type Error {
		path: String!
		message: String!
	}
`;

module.exports = Error;
