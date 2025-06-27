
//#region src/local-storage/index.ts
const plugin = {
	meta: { name: "eslint-plugin-stubborn" },
	configs: {},
	rules: { "no-localstorage": {
		meta: { schema: [{
			type: "object",
			properties: { globals: { type: "string" } },
			additionalProperties: false
		}] },
		create(context) {
			const option = context.options[0];
			return { MemberExpression(node) {
				let objectName = void 0;
				if (node.object.type === "Identifier") objectName = node.object.name;
				else if (node.object.type === "TSAsExpression" && node.object.expression.type === "Identifier") objectName = node.object.expression.name;
				if (objectName === "localStorage") context.report({
					node,
					message: `Avoid using localstorage globally. Instead, import the existing wrapper method from "${option.globals}".`
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