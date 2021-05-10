const path = require("path");

module.exports = {
  mode: "development", // could be "production" as well
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  rules: [
    { 
      test: /\.css$/, 
      use: ["style-loader", "css-loader"] 
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] },
      },
    },
  ],
  plugins: [    new HTMLWebpackPlugin()  ] 
};
