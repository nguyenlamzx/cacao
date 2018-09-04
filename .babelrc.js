module.exports = {
  "env": {
    "production": {
      "plugins": [
        "@babel/plugin-transform-classes",
        [
          "@babel/plugin-transform-runtime",
          {
            "helpers": true,
            "polyfill": false,
            "regenerator": false,
            "moduleName": "babel-runtime"
          }
        ],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-strict-mode",
        [
          "babel-plugin-transform-builtin-extend",
          {
            "globals": [
              "Error",
              "Array"
            ]
          }
        ]
      ]
    }
  },
  "presets": [
    [
      "@babel/preset-env",
      "@babel/preset-typescript",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
