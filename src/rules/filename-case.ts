import type { Rule } from 'eslint';
import path from 'path';

const kebabCaseRegex = /^[a-z]+(-[a-z]+)*(\.[a-z]+)?$/;
const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*(\.[a-z]+)?$/;


const noLocalStorageRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce kebab-case for file names',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: undefined,
    schema: [
      {
        enum: ["kebab", "pascal"],
      },
    ],
  },
  create(context) {
    const filename = path.basename(context.filename);
    const caseType = context.options?.[0];

    if (!caseType) { return {}; }

    if (caseType === "kebab" && !kebabCaseRegex.test(filename)) {
      context.report({
        message: 'File name should be in kebab-case.',
        loc: { line: 1, column: 0 },
      });
    }
    if (caseType === "pascal" && pascalCaseRegex.test(filename)) {
      context.report({
        message: 'File name should not be in PascalCase.',
        loc: { line: 1, column: 0 },
      });
    }
    return {

    };
  },
};

export default noLocalStorageRule;
