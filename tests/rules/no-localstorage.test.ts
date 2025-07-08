import { RuleTester } from 'eslint';
import noLocalStorageRule from '../../src/rules/no-localstorage';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-localstorage', noLocalStorageRule, {
  valid: [
    // 允许使用包装后的存储方法
    {
      code: 'import { storage } from "@/storage"; storage.setItem("key", "value");',
      options: [{ msg: '请使用 @/storage 模块' }],
    },
    // 允许其他类似名称但不是localStorage的对象
    {
      code: 'const myStorage = {}; myStorage.setItem("key", "value");',
      options: [{ msg: '请使用 @/storage 模块' }],
    },
    // 允许在注释中提到localStorage
    {
      code: '// This replaces localStorage usage',
      options: [{ msg: '请使用 @/storage 模块' }],
    },
  ],

  invalid: [
    // 直接使用 localStorage
    {
      code: 'localStorage.setItem("key", "value");',
      options: [{ msg: '请使用 @/storage 模块' }],
      errors: [
        {
          messageId: 'noLocalStorage',
          data: { message: '请使用 @/storage 模块' },
        },
      ],
    },
    // 使用 localStorage.getItem
    {
      code: 'const value = localStorage.getItem("key");',
      options: [{ msg: '请使用 @/storage 模块' }],
      errors: [
        {
          messageId: 'noLocalStorage',
          data: { message: '请使用 @/storage 模块' },
        },
      ],
    },
    // 使用 window.localStorage
    {
      code: 'window.localStorage.setItem("key", "value");',
      options: [{ msg: '请使用 @/storage 模块' }],
      errors: [
        {
          messageId: 'noLocalStorage',
          data: { message: '请使用 @/storage 模块' },
        },
      ],
    },
    // 使用 window.localStorage.getItem
    {
      code: 'const value = window.localStorage.getItem("key");',
      options: [{ msg: '请使用 @/storage 模块' }],
      errors: [
        {
          messageId: 'noLocalStorage',
          data: { message: '请使用 @/storage 模块' },
        },
      ],
    },
    // 默认消息测试
    {
      code: 'localStorage.clear();',
      options: [{}],
      errors: [
        {
          messageId: 'noLocalStorage',
          data: { message: 'Avoid using localStorage directly' },
        },
      ],
    },
  ],
});
