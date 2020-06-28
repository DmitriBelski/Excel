module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "semi": "off",
    "arrow-parens": "off",
    "comma-dangle": "off",
    "require-jsdoc": "off",
    // "linebreak-style": ["warn", process.env.NODE_ENV === 'production' ? "unix" : "windows"],
    "linebreak-style": "off",
    "operator-linebreak": "off",
    "max-len": [2, {"code": 120, "tabWidth": 4, "ignoreUrls": true}]
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
