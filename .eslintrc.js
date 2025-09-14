module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    // Production-ready rules
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error",
  },
  ignorePatterns: ["build/", "node_modules/", "*.json", "*.md", "*.sh"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
};
