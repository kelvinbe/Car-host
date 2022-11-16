const path = require("path");
const webpack = require("webpack");

// const custom = require("../fed-src/webpack.config.js")?.[0];

module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    // 👇 this is the addon that allows us to use the store in our stories
    "addon-redux",
  ],
  "framework": "@storybook/react",
    webpackFinal: async (config) => {
      // 👇 brought in the webpack config from the main app
      return {
        ...config,
        resolve: {
          ...config.resolve,
        },
        cache: true,
        plugins: [
          ...config.plugins
        ],
      }
    }
}