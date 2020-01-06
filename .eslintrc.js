module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
    "react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/jsx-uses-react": 2,
    "react/prop-types": 1,
    "no-debugger": 0,
    "no-unused-vars": 1
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
};