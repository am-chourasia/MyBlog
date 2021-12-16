import jwt from "jsonwebtoken";
import config from "../config.js";
import { User } from "../models/index.js";

// creating new token
export const createToken = async (user) => {
	const accessToken = await jwt.sign({ id: user.id }, config.accessKey, {
		expiresIn: "30min",
	});
	const refreshToken = await jwt.sign({ id: user.id }, config.refreshKey, {
		expiresIn: "7d",
	});
	return { accessToken, refreshToken };
};

// generate new Token with the given refresh token
export const genNewToken = async (token) => {
	let userId;
	try {
		const { id } = jwt.verify(token, config.refreshKey);
		userId = id;
	} catch (e) {
		// "JWT Refresh Token Not verified: "
		return {};
	}
	const user = await User.findById(userId);
	if (!user) {
		//"User with the given ID in the Refresh Token not present"
		return {};
	}
	const { accessToken, refreshToken } = await createToken(user);
	return {
		accessToken,
		refreshToken,
		user,
	};
};

// checking for logged user from the request
export const checkAuthHeaders = async ({ req, res }) => {
	let loggedUser;
	if (req.headers["x-auth-token"] && req.headers["x-refresh-token"]) {
		try {
			const accessToken = req.headers["x-auth-token"];
			const { id } = await jwt.verify(accessToken, config.accessKey);
			loggedUser = await User.findById(id);
		} catch (e) {
			const refreshToken = req.headers["x-refresh-token"];
			const newToken = await genNewToken(refreshToken);
			if (newToken.accessToken && newToken.refreshToken) {
				res.set("Access-Control-Expose-Headers", "x-auth-token");
				res.set("x-auth-token", newToken.accessToken);
				loggedUser = newToken.user;
			}
		}
	}
	return {
		currentUser: loggedUser,
		req,
		res,
	};
};

export const attemptLogin = async ({ email, password }) => {
	try {
		const user = await User.findOne({ email });
		// if the user doesn't exist
		if (!user) {
			return {
				__typename: "SigningUnsuccessful",
				errors: [
					{
						path: "attemptLogin:email",
						message: "No user with the given email",
					},
				],
			};
		}

		// if the password doesn't match;
		if (!(await user.comparePassword(password))) {
			return {
				__typename: "SigningUnsuccessful",
				errors: [
					{
						path: "attemptLogin:password",
						message: "Password Incorrect!",
					},
				],
			};
		}
		// creating token:
		const { accessToken, refreshToken } = await createToken(user);
		return {
			__typename: "LoginSuccessful",
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	} catch (error) {
		return {
			__typename: "SigningUnsuccessful",
			errors: [
				{
					path: "attemptLogin",
					message: error.message,
				},
			],
		};
	}
};
