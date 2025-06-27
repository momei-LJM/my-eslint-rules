
//#region src/local-storage/index.ts
const plugin = {
	meta: { name: "eslint-plugin-stubborn" },
	configs: {},
	rules: { "no-localstorage": {
		meta: { schema: [{
			type: "object",
			properties: { msg: { type: "string" } },
			additionalProperties: false
		}] },
		create(context) {
			const option = context.options[0];
			return { MemberExpression(node) {
				let objectName;
				if (node.object.type === "Identifier") objectName = node.object.name;
				else if (node.object.type === "TSAsExpression" && node.object.expression.type === "Identifier") objectName = node.object.expression.name;
				else if (node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "window" && node.object.property.type === "Identifier" && node.object.property.name === "localStorage") objectName = "window.localStorage";
				if (objectName === "localStorage" || objectName === "window.localStorage") context.report({
					node,
					message: `(订舱eslint): ${option.msg}.`
				});
			} };
		}
	} }
};
var local_storage_default = plugin;

//#endregion
//#region src/index.ts
const eslintPluginLocalStorage = local_storage_default;

//#endregion
exports.eslintPluginLocalStorage = eslintPluginLocalStorage;