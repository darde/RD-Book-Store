module.exports = {
    "extends": "airbnb",
    "globals": {
      "window": true,
      "document": true,
      "SYMPHONY": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "jsx-quotes": 0,
      "no-param-reassign": ["error", { "props": false }],
      "jsx-a11y/href-no-hash": 0,
      "class-methods-use-this": 0,
      "one-var": 0,
      "no-underscore-dangle": 0,
      "no-restricted-syntax": 0,
      "no-shadow": 0,
      "quotes": [2, "single"],
      "import/no-named-as-default": "warn",
      "array-callback-return": "warn",
      "import/prefer-default-export": "warn",
    },
};