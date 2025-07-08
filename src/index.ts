import noLocalStorageRule from './rules/no-localstorage';
import fileNameCaseRule from './rules/filename-case';
const plugin = {
  meta: {
    name: 'eslint-plugin-stubborn',
    version: '1.0.0',
  },
  configs: {
    recommended: {
      plugins: ['stubborn'],
      rules: {
        'stubborn/no-localstorage': 'error',
        'stubborn/filename-case': ['error', 'kebab'], // 默认使用 kebab-case
      },
    },
  },
  rules: {
    'no-localstorage': noLocalStorageRule,
    'filename-case': fileNameCaseRule,
  },
};

export default plugin;
export const stubbornEslintPlugin = plugin;
export { createStubbornEslintRule } from './utils';