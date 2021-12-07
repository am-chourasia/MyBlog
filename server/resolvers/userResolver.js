import { User } from "../models/index.js";
import { attemptLogin } from "../helpers/auth.js";

export default {
	Query: {
		currentUser: async (parent, args, context, _) => {
			return await context.currentUser;
		},
	},
	Mutation: {
		registerUser: async (root, args, context, info) => {
			try {
				const user = await User.create({ ...args });
				return {
					ok: true,
					user: user,
				};
			} catch (e) {
				throw new Error(e);
			}
		},
		loginUser: async (parent, args, context, info) => {
			return {
				...(await attemptLogin({ ...args })),
			};
		},
	},
};
