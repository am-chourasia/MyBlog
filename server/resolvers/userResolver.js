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
				const user = await User.create({ ...args.input });
				return {
					__typename: "RegistrationSuccessful",
					user: user,
				};
			} catch (e) {
				return {
					__typename: "SigningUnsuccessful",
					errors: [
						{
							path: "registerUser",
							message: `Error while registering the user with given args! \n ${e.message}`,
						},
					],
				};
			}
		},
		loginUser: async (parent, args, context, info) => {
			return {
				...(await attemptLogin({ ...args.input })),
			};
		},
	},
};
