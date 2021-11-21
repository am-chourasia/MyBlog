import { User } from "../models/index.js";

export default {
	Query: {
		currentUser: (parent, args, context, _) => {},
	},
	Mutation: {
		registerUser: async (root, args, context, info) => {
			try {
				const user = await User.create({ ...args });
				return {
					ok: true,
					user: user,
					// errors: [],
				};
			} catch (e) {
				throw new Error(e);
			}
		},
		loginUser: (parent, args, context, info) => {},
	},
};
