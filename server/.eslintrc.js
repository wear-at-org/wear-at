module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "jest", 
    "import"
  ],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  rules: {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "no-use-before-define": ["error", { "variables": false }],
    "no-multi-str": 0,
    "no-useless-constructor": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "class-methods-use-this": false,
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
  },
  env: {
    "node": true,
    "es6": true,
    "jest": true
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true, 
        "project": `${__dirname}/tsconfig.json`,
      },
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}

