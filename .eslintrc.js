module.exports = {
  env: {
    "browser": true,
    "es6": true,
  },
  "extends": "eslint:recommended" ,
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "quotes": ["error", "single", { "avoidEscape": true }],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "key-spacing": ["error", {"beforeColon": true, "beforeColon": true}],
    "semi-spacing": ["error", {"before": false, "after": false}],
    "no-undef":"off", // only for a chrome exension. With the chrome object everywhere
    "no-use-before-define":["error", { "functions": false,"variables": false }],
    "no-trailing-spaces": "error",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1,"maxBOF":0 }],
    "no-extra-parens": "error",
    "no-multi-spaces": "error",
    "space-before-blocks": "error",
     "space-before-function-paren": "error",
     "space-in-parens": ["error", "never"],
     "space-infix-ops" : "error",
     "spaced-comment" : ["error", "always"],
     "comma-spacing": ["error", { "before": false, "after": false }],
     "brace-style": "error",
     "computed-property-spacing": [ "error", "never"],
     "keyword-spacing": "error",
    "linebreak-style": "error",
    "semi": "error",
  }
};