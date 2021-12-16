module.exports = {
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
    }],
    "@babel/plugin-syntax-dynamic-import"
  ]
};
