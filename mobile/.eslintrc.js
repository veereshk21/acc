module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "spread": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "arrow-parens": [
      "error",
      "always"
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "dot-location": [
      2,
      "property"
    ],
    "eol-last": 2,
    "eqeqeq": [
      2,
      "always"
    ],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "camelcase": 0,
    "func-names": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/imports-first": 1,
    "import/newline-after-import": 1,
    "import/no-dynamic-require": 1,
    "import/no-extraneous-dependencies": 1,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/jsx-closing-tag-location": 1,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/no-redundant-roles": 0,
    "no-nested-ternary": 0,
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-console": 1,
    "no-plusplus": 0,
    "no-return-assign": 0,
    "no-alert": 0,
    "no-use-before-define": 0,
    "no-restricted-syntax": 0,
    "guard-for-in": 0,
    "prefer-template": 0,
    "class-methods-use-this": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-first-prop-new-line": [
      2,
      "multiline-multiprop"
    ],
    "react/jsx-filename-extension": 0,
    "react/jsx-no-target-blank": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 2,
    "react/require-default-props": 0,
    "react/jsx-no-bind": 0,
    "react/no-array-index-key": 0,
    "react/no-danger": 0,
    "react/no-danger-with-children": 0,
    "react/no-unused-state": 1,
    "no-underscore-dangle": 0,
    "react/jsx-indent": 0,
  },
  "globals": {
    "__webpack_public_path__": true,
    "window": true,
    "document": true
  }
};
