# ESLint Plugin Stubborn

一个自定义的 ESLint 插件，用于限制直接使用 `localStorage`，建议使用统一的存储模块。

## 安装

```bash
npm install --save-dev eslint-plugin-stubborn
```

## 使用

### 在 ESLint Flat Config 中使用

```javascript
import { defineConfig } from "eslint/config";
import { createLocalEslintRule } from "eslint-plugin-stubborn/utils";

export default defineConfig([
  ...createLocalEslintRule({
    msg: "请使用 @/storage 模块替代直接使用 localStorage",
    ignores: ["tests/**", "*.config.js"], // 可选：忽略的文件
  }),
]);
```

### 手动配置

```javascript
import plugin from "eslint-plugin-stubborn";

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      stubborn: plugin,
    },
    rules: {
      "stubborn/no-localstorage": [
        "error",
        {
          msg: "请使用 @/storage 模块替代直接使用 localStorage",
        },
      ],
    },
  },
]);
```

## 规则

### `stubborn/no-localstorage`

禁止直接使用 `localStorage`，建议使用统一的存储模块。

#### 选项

- `msg` (string): 自定义错误消息

#### 错误示例

```javascript
// ❌ 错误
localStorage.setItem("key", "value");
localStorage.getItem("key");
window.localStorage.clear();

// ✅ 正确
import { storage } from "@/storage";
storage.setItem("key", "value");
storage.getItem("key");
```

### `stubborn/filename-case`

约束文件名的命名规范，支持 `kebab-case` 和 `PascalCase`。

#### 选项

- `case` (string): 文件名的命名规范，可选值为：
  - `"kebab"`：短横线命名法，例如 `file-name.js`
  - `"pascal"`：帕斯卡命名法，例如 `FileName.js`

#### 错误示例

##### 配置为 `kebab-case`

```javascript
// ❌ 错误
FileName.js
fileName.js
file--name.js

// ✅ 正确
file-name.js
my-component.ts
```

##### 配置为 `PascalCase`

```javascript
// ❌ 错误
file - name.js;
fileName.js;
FILEName.js;

// ✅ 正确
FileName.js;
MyComponent.ts;
```

#### 配置示例

```javascript
import plugin from "eslint-plugin-stubborn";

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      stubborn: plugin,
    },
    rules: {
      "stubborn/filename-case": ["error", "kebab"],
    },
  },
]);
```

## 开发

### 运行测试

```bash
npm test
```

### 构建

```bash
npm run build
```

### 开发模式

```bash
npm run dev
```
