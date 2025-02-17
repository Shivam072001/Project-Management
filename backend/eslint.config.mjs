import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Base ESLint rules for JavaScript
  js.configs.recommended,

  // TypeScript-specific rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        process: "readonly", // ✅ Fixes 'process is not defined' error
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly", // ✅ Fixes 'console is not defined' error
        Express: "readonly", // ✅ Fixes 'Express is not defined' error
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier,
    },
    rules: {
      ...ts.configs.recommended.rules, // Extend TypeScript recommended rules

      // ✅ Prettier integration
      "prettier/prettier": "error", // Enforce Prettier formatting

      // ✅ TypeScript Best Practices
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ], // Encourage explicit return types but allow flexibility
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused variables prefixed with `_`
      "@typescript-eslint/no-explicit-any": "warn", // Discourage but allow `any`
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // Prefer interfaces over types

      // ✅ General Code Quality
      "no-console": ["warn", { allow: ["log", "warn", "error", "debug"] }], // Allow `console.warn/error`, warn on others
      "no-debugger": "error", // Disallow `debugger`
      "no-var": "error", // Enforce `let` or `const`
      "prefer-const": "error", // Prefer `const` when possible
      "eqeqeq": ["error", "always"], // Enforce strict equality (`===`)
    },
  },

  // Integrate Prettier to avoid conflicts with ESLint formatting rules
  prettierConfig,
];
