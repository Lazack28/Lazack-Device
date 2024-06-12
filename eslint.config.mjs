import globals from "globals";
import pluginJs from "@eslint/js";
import { rules } from "@eslint/js/src/configs/eslint-all";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  rules["no-unused-vars"],
];