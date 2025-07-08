import { defineConfig } from "eslint/config";
import { createStubbornEslintRule } from "./dist/index.js";

export default defineConfig([
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
  ...createStubbornEslintRule({
    msg: '请在 "@/storage" 模块中包装该方法',
    ignores: ["src/test-ignore/**"],
    include: ["src/test/**/*.{js,ts,jsx,tsx}"],
  }),
]);
