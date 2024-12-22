// Import necessary dependencies
const path = require('path'); // Path module for resolving file paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate an HTML file with the bundled assets
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Plugin to extract CSS into separate files
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean the dist folder before each build
const webpack = require('webpack'); // Access to the webpack library

module.exports = {
  // Entry point for the application (main JavaScript file)
  entry: "./src/components/index.js",

  // Output configuration for bundled files
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory where the bundled files will be placed
    filename: '[name].bundle.js', // Name of the bundled JavaScript files
    assetModuleFilename: 'assets/images/[hash][ext][query]', // Location and naming pattern for asset files (images, fonts, etc.)
  },

  // Source map configuration for easier debugging
  devtool: 'source-map',

  // Module rules to define how different file types are handled
  module: {
    rules: [
      {
        // CSS files handling using style-loader and css-loader
        test: /\.css$/i, // Target .css files
        use: ['style-loader', 'css-loader'], // Use these loaders for handling CSS files
      },
      {
        // JavaScript and JSX files handling using Babel
        test: /\.(?:js|jsx)$/, // Target .js and .jsx files
        exclude: /node_modules/, // Exclude the node_modules directory from being processed
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }], // For modern JavaScript support (targeting default browsers)
              ['@babel/preset-react', { targets: "defaults" }], // For React JSX transpilation
            ]
          }
        }
      },
      {
        // Image files handling (png, svg, jpg, jpeg, gif)
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Target image files
        type: 'asset/resource', // Use asset/resource to handle images as resources (URLs will be generated)
      },
    ],
  },

  // Resolve configuration to handle imports
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve these file extensions when importing
    alias: {
      // Define custom path aliases for easier imports
      Utilities: path.resolve(__dirname, 'src/utilities'), // Alias for the 'src/utilities' directory
    }
  },

  // Plugins configuration to extend Webpack functionality
  plugins: [
    // Clean the output directory before each build
    new CleanWebpackPlugin(),

    // Define global constants that can be used in the application code
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false), // Define a PRODUCTION variable (set to false for development)
      VERSION: JSON.stringify('5fa3b9'), // Define the current version of the project
      BROWSER_SUPPORTS_HTML5: true, // Define support for HTML5 (hardcoded to true)
      TWO: '1+1', // Define a custom constant (expression will be evaluated)
      'typeof window': JSON.stringify('object'), // Define typeof window for client-side code (important for isomorphic code)
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // Define the current environment (default to 'development')
      API_URL: JSON.stringify('http://api/v2/graphql'), // Define API URL for the app
    }),

    // Extract CSS into separate files
    new MiniCssExtractPlugin({filename: 'styles.css'}), // Output the extracted CSS into a file named 'styles.css'

    // Generate an HTML file that includes the bundled JavaScript and CSS files
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template (can be used to inject script/link tags)
      filename: 'index.html',       // Output file name for the generated HTML
      inject: 'body',               // Inject scripts into the body of the HTML (default is 'head')
      minify: {
        collapseWhitespace: true,   // Minify HTML by removing unnecessary whitespace
        removeComments: true,       // Remove comments from the HTML
      },
    }),
  ],

  // Set the mode of the build process (development mode in this case)
  mode: 'development'
}
