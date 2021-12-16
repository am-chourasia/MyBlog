import { gql } from "apollo-server-express";

export default gql`
	type Post {
		id: ID!
		title: String!
		body: String!
		tags: [String]!
		author: User!
		createdAt: String!
	}
	input postInput {
		title: String!
		body: String!
		tags: [String] = []
		author: ID!
	}
	type UpsertSuccessful {
		post: Post!
	}
	type RemovalSuccessful {
		removed: Boolean!
	}
	type PostError {
		errors: [Error!]!
	}
	union UpsertResponse = UpsertSuccessful | PostError
	union RemovalResponse = RemovalSuccessful | PostError

	extend type Query {
		getPost(postID: ID!): Post! @auth
		getPosts: [Post]! @auth
	}
	extend type Mutation {
		createPost(input: postInput!): UpsertResponse! @auth
		updatePost(postID: ID!, input: postInput): UpsertResponse! @auth
		removePost(postID: ID!): RemovalResponse! @auth
	}
`;
