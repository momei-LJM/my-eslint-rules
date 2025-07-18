import path from "path";
import tsEslintParaser from "@typescript-eslint/parser";

//#region src/rules/no-localstorage.ts
const noLocalStorageRule$1 = {
	meta: {
		type: "problem",
		docs: {
			description: "Disallow direct use of localStorage",
			category: "Best Practices",
			recommended: true
		},
		fixable: void 0,
		schema: [{
			type: "object",
			properties: { msg: { type: "string" } },
			additionalProperties: false
		}],
		messages: { noLocalStorage: "{{message}}" }
	},
	create(context) {
		const option = context.options[0];
		const message = option?.msg || "Avoid using localStorage directly";
		return { MemberExpression(node) {
			let objectName;
			if (node.object.type === "Identifier") objectName = node.object.name;
			else if (node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "window" && node.object.property.type === "Identifier" && node.object.property.name === "localStorage") objectName = "window.localStorage";
			if (objectName === "localStorage" || objectName === "window.localStorage") context.report({
				node,
				messageId: "noLocalStorage",
				data: { message }
			});
		} };
	}
};
var no_localstorage_default = noLocalStorageRule$1;

//#endregion
//#region src/rules/filename-case.ts
const kebabCaseRegex = /^[a-z]+(-[a-z]+)*(\.[a-z]+)?$/;
const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*(\.[a-z]+)?$/;
const noLocalStorageRule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Enforce kebab-case for file names",
			category: "Stylistic Issues",
			recommended: false
		},
		fixable: void 0,
		schema: [{ enum: ["kebab", "pascal"] }]
	},
	create(context) {
		const filename = path.basename(context.filename);
		const caseType = context.options?.[0];
		if (!caseType) return {};
		if (caseType === "kebab" && !kebabCaseRegex.test(filename)) context.report({
			message: "File name should be in kebab-case.",
			loc: {
				line: 1,
				column: 0
			}
		});
		if (caseType === "pascal" && pascalCaseRegex.test(filename)) context.report({
			message: "File name should not be in PascalCase.",
			loc: {
				line: 1,
				column: 0
			}
		});
		return {};
	}
};
var filename_case_default = noLocalStorageRule;

//#endregion
//#region src/utils.ts
/**
* 创建本地 ESLint 规则配置
* @param {Object} options - 配置项
* @param {string} options.msg - 报错消息内容
* @param {Array<string>} [options.ignores] - 忽略的文件模式
* @returns {Array<Object>} ESLint Flat Config 配置数组
*/
const createStubbornEslintRule = (options) => {
	const { msg, ignores = [], include = void 0 } = options;
	const baseConfig = {
		files: include ?? ["**/*.{js,ts,jsx,tsx}"],
		languageOptions: { parser: tsEslintParaser },
		plugins: { stubborn: src_default },
		rules: {
			"stubborn/no-localstorage": ["error", { msg }],
			"stubborn/filename-case": ["error", "kebab"]
		}
	};
	const configs = [baseConfig];
	if (ignores.length > 0) configs.push({
		files: ignores,
		plugins: { stubborn: src_default },
		rules: {
			"stubborn/no-localstorage": "off",
			"stubborn/filename-case": "off"
		}
	});
	return configs;
};

//#endregion
//#region src/index.ts
const plugin = {
	meta: {
		name: "eslint-plugin-stubborn",
		version: "1.0.0"
	},
	configs: { recommended: {
		plugins: ["stubborn"],
		rules: {
			"stubborn/no-localstorage": "error",
			"stubborn/filename-case": ["error", "kebab"]
		}
	} },
	rules: {
		"no-localstorage": no_localstorage_default,
		"filename-case": filename_case_default
	}
};
var src_default = plugin;
const stubbornEslintPlugin = plugin;

//#endregion
export { createStubbornEslintRule, src_default as default, stubbornEslintPlugin };