import { defineConfig } from "eslint/config";

import BookingEslint from "./src/lib/useLocalStorageRule/index.js";
export default defineConfig([
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
  ...BookingEslint.createLocalEslintRule({
    msg: '请在 "@/storage" 模块中包装改方法',
    ignores: ["src/test-ignore/**"],
  }),
]);
