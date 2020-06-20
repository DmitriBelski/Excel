module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "semi": "off",
    "arrow-parens": "off",
    "comma-dangle": "off",
    "require-jsdoc": "off",
    // "linebreak-style": ["warn", process.env.NODE_ENV === 'production' ? "unix" : "windows"],
    "linebreak-style": "off",
    // "linebreak-style": ["error", "windows"]
    "operator-linebreak": "off",
    // "no-unused-vars": "warn"
    // "no-unused-vars": "error"
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "google"
  ]
}
