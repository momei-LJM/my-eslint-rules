import { eslintPluginLocalStorage } from "../../../dist/index.js";
import tsEslintParaser from "@typescript-eslint/parser";
/**
 * @param {Object} options - 配置项
 * @param {string} options.msg - report 消息
 * @param {Array<string>} options.ignores - 忽略模块
 * @returns {Array<Object>} ESLint Flat Config 配置数组
 */
const createLocalEslintRule = (options) => {
  const { msg = "", ignores = [] } = options;
  return [
    {
      files: ["**/*.{js,ts,jsx,tsx}"],
      languageOptions: {
        parser: tsEslintParaser,
      },
      plugins: {
        any: eslintPluginLocalStorage,
      },
      rules: {
        "any/no-localstorage": ["error", { msg }],
      },
    },
    {
      files: ignores,
      rules: {
        "any/no-localstorage": "off",
      },
    },
  ];
};
export default {
  createLocalEslintRule,
};
