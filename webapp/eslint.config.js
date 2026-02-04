import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import path from "path";

export default [
  // TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: path.resolve("."),
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // React + JSX + accessibility
  {
    files: ["**/*.tsx", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["vite.config.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: path.resolve("."),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
];
