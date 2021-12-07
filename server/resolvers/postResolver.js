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
					ok: true,
					post: post,
					error: [],
				};
			} catch (error) {
				console.error("Error creating the post");
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
					ok: true,
					post: post,
					error: [],
				};
			} catch (error) {
				console.error("Error updating the post");
			}
		},
		removePost: async (_, args, __, ___) => {
			try {
				await Post.deleteOne({ _id: args.postID });
				return {
					ok: true,
					error: [],
				};
			} catch (error) {
				console.error("Error deleting the post");
			}
		},
	},
	Post: {
		author: async (parent, args, context, _) => {
			return await User.findById({ _id: parent.author });
		},
	},
};
