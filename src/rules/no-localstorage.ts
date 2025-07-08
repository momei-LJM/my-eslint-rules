import type { Rule } from 'eslint';

interface StorageOption {
  msg: string;
}

const noLocalStorageRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct use of localStorage',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: undefined,
    schema: [
      {
        type: 'object',
        properties: {
          msg: { type: 'string' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noLocalStorage: '{{message}}',
    },
  },

  create(context) {
    const option = context.options[0] as StorageOption;
    const message = option?.msg || 'Avoid using localStorage directly';

    return {
      MemberExpression(node: any) {
        let objectName: string | undefined;

        if (node.object.type === 'Identifier') {
          objectName = node.object.name;
        }
        // 兼容 window.localStorage.setItem
        else if (
          node.object.type === 'MemberExpression' &&
          node.object.object.type === 'Identifier' &&
          node.object.object.name === 'window' &&
          node.object.property.type === 'Identifier' &&
          node.object.property.name === 'localStorage'
        ) {
          objectName = 'window.localStorage';
        }

        if (objectName === 'localStorage' || objectName === 'window.localStorage') {
          context.report({
            node,
            messageId: 'noLocalStorage',
            data: {
              message,
            },
          });
        }
      },
    };
  },
};

export default noLocalStorageRule;
