import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import styledA11y from 'eslint-plugin-styled-components-a11y';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      'styled-components-a11y': styledA11y,
    },
    rules: {
      semi: "error",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off"
    }
  }
];
