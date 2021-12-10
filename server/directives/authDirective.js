import { AuthenticationError } from "apollo-server-express";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
function AuthDirectiveTransformer(schema, directiveName) {
	return mapSchema(schema, {
		// Executes once for each object field in the schema
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			// Check whether this field has the specified directive
			const AuthDirective = getDirective(
				schema,
				fieldConfig,
				directiveName
			)?.[0];

			if (AuthDirective) {
				// Get this field's original resolver
				const { resolve = defaultFieldResolver } = fieldConfig;

				// Replace the original resolver with a function that *first* calls
				// the original resolver, then converts its result to upper case
				fieldConfig.resolve = async function (source, args, context, info) {
					if (
						!context.req.headers["x-auth-token"] ||
						!context.req.headers["x-refresh-token"]
					) {
						throw new AuthenticationError("Please Log In to continue");
					}

					if (!context.currentUser)
						throw new AuthenticationError("Please Log In to continue");

					const result = await resolve(source, args, context, info);
					return result;
				};
				return fieldConfig;
			}
		},
	});
}

export default AuthDirectiveTransformer;
