// eslint.config.js

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    plugins: {
      import: importPlugin,
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      "no-console": "error",

      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/**/!(*.integration.test.ts)",
              from: "./src/test",
              message:
                "Import something from test dir only inside integration tests",
            },
          ],
        },
      ],
    },
  },
];
