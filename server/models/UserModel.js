import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate: {
			async validator(value) {
				const result = await this.constructor.findOne({ email: value });
				if (result) {
					return false;
				}
			},
			message: "Email already exist",
		},
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

// hash the function when the user is saved in the database
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;
	const salt = await bcryptjs.genSalt(10);
	const hash = await bcryptjs.hash(this.password, salt);
	// change the plain password with the hashed one.
	this.password = hash;
	next();
});

UserSchema.methods.comparePassword = async function (password) {
	return await bcryptjs.compare(password, this.password); // the password passed to the function against the password stored in the database
};

export default mongoose.model("user", UserSchema);
