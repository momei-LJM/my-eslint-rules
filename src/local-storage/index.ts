
import { type Plugin } from '@eslint/config-helpers';
interface storageOption {
  msg: string

}
const plugin: Plugin = {
  meta: {
    name: "eslint-plugin-stubborn",

  },
  configs: {},
  rules: {
    "no-localstorage": {
      meta: {
        schema: [
          {
            type: "object",
            properties: {
              msg: { type: "string" },
            },
            additionalProperties: false,
          },
        ],
      },

      create(context) {
        const option = context.options[0] as storageOption;

        return {
          MemberExpression(node) {
            let objectName: string | undefined;

            // localStorage.setItem(...)
            if (node.object.type === "Identifier") {
              objectName = node.object.name;
            }
            // (localStorage as any).setItem(...)
            else if (
              node.object.type === "TSAsExpression" &&
              node.object.expression.type === "Identifier"
            ) {
              objectName = node.object.expression.name;
            }
            // window.localStorage.setItem(...)
            else if (
              node.object.type === "MemberExpression" &&
              node.object.object.type === "Identifier" &&
              node.object.object.name === "window" &&
              node.object.property.type === "Identifier" &&
              node.object.property.name === "localStorage"
            ) {
              objectName = "window.localStorage";
            }

            if (objectName === "localStorage" || objectName === "window.localStorage") {
              context.report({
                node,
                message: `(订舱eslint): ${option.msg}.`,
              });
            }
          },

        };
      },

    },
  },
};

export default plugin;
