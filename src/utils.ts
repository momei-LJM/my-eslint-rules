import plugin from './index';
import tsEslintParaser from '@typescript-eslint/parser'

interface CreateRuleOptions {
  msg: string;
  ignores?: string[];
}

/**
 * 创建本地 ESLint 规则配置
 * @param {Object} options - 配置项
 * @param {string} options.msg - 报错消息内容
 * @param {Array<string>} [options.ignores] - 忽略的文件模式
 * @returns {Array<Object>} ESLint Flat Config 配置数组
 */
export const createStubbornEslintRule = (options: CreateRuleOptions) => {
  const { msg, ignores = [] } = options;

  const baseConfig = {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsEslintParaser,
    },
    plugins: {
      stubborn: plugin,
    },
    rules: {
      'stubborn/no-localstorage': ['error', { msg }],
      'stubborn/filename-case': ['error', 'kebab'],
    },
  };

  const configs: any[] = [baseConfig];

  // 如果有忽略文件，添加忽略配置
  if (ignores.length > 0) {
    configs.push({
      files: ignores,
      plugins: {
        stubborn: plugin,
      },
      rules: {
        'stubborn/no-localstorage': 'off',
        'stubborn/filename-case': 'off',
      },
    });
  }

  return configs;
};

export default plugin;
