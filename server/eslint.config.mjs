import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: true,
      },
    },
  },
  pluginJs.configs.recommended,
];
