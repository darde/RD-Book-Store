module.exports = {
    "extends": "airbnb",
    "globals": {
      "window": true,
      "document": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "jsx-quotes": 0,
      "no-param-reassign": ["error", { "props": false }],
      "class-methods-use-this": 0,
      "one-var": 0,
      "no-underscore-dangle": 0,
      "no-restricted-syntax": 0,
      "no-shadow": 0,
      "quotes": [2, "single"],
      "import/no-named-as-default": "warn",
      "array-callback-return": "warn",
      "import/prefer-default-export": "warn",
      "react/no-array-index-key": 0,
      "no-debugger": "warn",
      "react/require-default-props": 0,
    },
};