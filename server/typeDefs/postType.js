import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		getPost(postID: ID!): Post! @auth
		getPosts: [Post]! @auth
	}
	extend type Mutation {
		createPost(input: postInput): MutationResponse! @auth
		updatePost(postID: ID!, input: postInput): MutationResponse! @auth
		removePost(postID: ID!): RemoveMutationResponse! @auth
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
		tags: [String]!
		author: User!
		createdAt: String!
	}
`;
