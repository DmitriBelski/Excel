module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "semi": "off",
    "arrow-parens": "off",
    "comma-dangle": "off",
    "require-jsdoc": "off",
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
    // "linebreak-style": 0
    // "linebreak-style": ["error", "windows"]
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
