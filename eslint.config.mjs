import { base, react, testing } from '@inzumer/eslint';

const pragma = /^(\/\s*<reference\b|\s*(eslint-|@ts-|@vitest-environment\b))/;

const isFunction = (node) =>
  ['ArrowFunctionExpression', 'FunctionExpression'].includes(node?.type) ||
  (node?.type === 'CallExpression' && node.arguments.some(isFunction)) ||
  (node?.type === 'TSAsExpression' && isFunction(node.expression));

const declaresFunction = (statement) => {
  const node = statement.declaration ?? statement;
  return (
    ['FunctionDeclaration', 'TSDeclareFunction'].includes(node.type) ||
    (statement.type === 'ExportDefaultDeclaration' && isFunction(node)) ||
    (node.type === 'VariableDeclaration' &&
      node.declarations.length === 1 &&
      isFunction(node.declarations[0].init))
  );
};

const isJsDoc = (comment) => comment.type === 'Block' && comment.value.startsWith('*');

const noComments = {
  rules: {
    'no-comments': {
      meta: {
        type: 'suggestion',
        schema: [],
        messages: {
          comment: 'No comments: only a JSDoc right above a top-level function.',
        },
      },
      create: (context) => ({
        Program: (program) => {
          const { sourceCode } = context;
          const allowed = new Set(
            program.body
              .filter(declaresFunction)
              .map((statement) => sourceCode.getCommentsBefore(statement).at(-1))
              .filter((comment) => comment && isJsDoc(comment)),
          );
          sourceCode
            .getAllComments()
            .filter((comment) => !pragma.test(comment.value) && !allowed.has(comment))
            .forEach((node) => context.report({ node, messageId: 'comment' }));
        },
      }),
    },
  },
};

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'coverage/**'],
  },
  ...base,
  ...react,
  ...testing,
  {
    plugins: { inzumer: noComments },
    rules: { 'inzumer/no-comments': 'error' },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },
];
