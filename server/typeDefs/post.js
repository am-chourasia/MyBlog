const { gql } = require("apollo-server-express");

const post = gql`
	extend type Query {
		getPost(postID: ID!): Post!
		getPosts: [Post]!
	}
	extend type Mutation {
		createPost(input: postInput): MutationResponse!
		updatePost(postID: ID!, input: postInput): MutationResponse!
		removePost(postID: ID!): RemoveMutationResponse!
	}
	input postInput {
		title: String!
		body: String!
		tags: [String] = []
		author: ID!
	}
	type MutationResponse {
		ok: Boolean!
		post: Post!
		error: [Error]!
	}
	type RemoveMutationResponse {
		ok: Boolean!
		error: [Error]!
	}
	type Post {
		id: ID!
		title: String!
		body: String!
		tags: [String]
		author: User!
		createdAt: String!
	}
`;

module.exports = post;
