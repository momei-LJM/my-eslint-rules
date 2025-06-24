//#region src/local-storage/index.ts
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3"
	},
	processors: { "processor-name": {
		preprocess(text, filename) {},
		postprocess(messages, filename) {}
	} }
};
var local_storage_default = plugin;

//#endregion
//#region src/index.ts
const eslintPluginLocalStorage = local_storage_default;

//#endregion
export { eslintPluginLocalStorage };