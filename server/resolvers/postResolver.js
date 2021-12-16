import { User, Post } from "../models/index.js";

export default {
	Query: {
		getPost: async (_, args, __, ____) => {
			return await Post.findOne({ _id: args.postID });
		},
		getPosts: async (parent, args, context, _) => {
			return await Post.find({});
		},
	},
	Mutation: {
		createPost: async (_, args, __, ___) => {
			try {
				const post = await Post.create(args.input);
				return {
					__typename: "UpsertSuccessful",
					post: post,
				};
			} catch (error) {
				return {
					__typename: "PostError",
					errors: [
						{
							path: "createPost",
							message: `Error creating the given post! : ${error.message}`,
						},
					],
				};
			}
		},
		updatePost: async (_, args, __, ___) => {
			try {
				const post = await Post.findByIdAndUpdate(
					args.postID,
					{ $set: { ...args.input } },
					{ new: true }
				);
				return {
					__typename: "UpsertSuccessful",
					post: post,
				};
			} catch (error) {
				return {
					__typename: "PostError",
					errors: [
						{
							path: "updatePost",
							message: `Error updating the post with id ${args.postID} : ${error.message}`,
						},
					],
				};
			}
		},
		removePost: async (_, args, __, ___) => {
			try {
				await Post.deleteOne({ _id: args.postID });
				return {
					__typename: "RemovalSuccessful",
					removed: true,
				};
			} catch (error) {
				return {
					__typename: "PostError",
					errors: [
						{
							path: "removePost",
							message: `Error deleting the post with id ${args.postID} : ${error.message}`,
						},
					],
				};
			}
		},
	},
	Post: {
		author: async (parent, _, __, ___) => {
			return await User.findById({ _id: parent.author });
		},
	},
};
