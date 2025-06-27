import { defineConfig } from "eslint/config";
import { eslintPluginLocalStorage } from "./dist/index.js";
import tsEslintParaser from "@typescript-eslint/parser";
export default defineConfig([
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsEslintParaser,
    },
    plugins: {
      any: eslintPluginLocalStorage,
    },
    rules: {
      "any/no-localstorage": ["error", { globals: "@/storage" }],
    },
  },
]);
