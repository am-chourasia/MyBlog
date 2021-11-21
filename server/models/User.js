import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		date: Date.now(),
	},
});

export default mongoose.model("user", UserSchema);
