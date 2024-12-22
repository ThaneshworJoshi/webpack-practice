const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Entry point for the application
  entry: "./src/components/index.js",
  
  output: {
    // Output directory for bundled files
    path: path.resolve(__dirname, 'prod-dist'),
    // Output filename pattern
    filename: '[name].bundle.js',
    // Output path for asset modules
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  
  module: {
    rules: [
      {
        // Rule for processing CSS files
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        // Rule for processing JavaScript and JSX files
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // Preset for modern JavaScript
              ['@babel/preset-env', { targets: "defaults" }],
              // Preset for React
              ['@babel/preset-react', { targets: "defaults" }],
            ]
          }
        }
      },
      {
        // Rule for processing image files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  resolve: {
    // Automatically resolve these extensions
    extensions: ['.js', '.jsx'],
    alias: {
      // Create alias for easier imports
      Utilities: path.resolve(__dirname, 'src/utilities'),
    }
  },
  
  performance: {
    hints: 'warning', // Show warnings for performance issues
    maxAssetSize: 10000, // Maximum asset size in bytes
    maxEntrypointSize: 40000, // Maximum entry point size in bytes
  },
  
  plugins: [
    // Plugin to clean the output directory before each build
    new CleanWebpackPlugin(),
    
    // Define environment variables
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      API_URL: JSON.stringify('http://api/v2/graphql'),
    }),
    
    // Plugin to extract CSS into separate files
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    
    // Plugin to generate an HTML file from a template
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html',       // Output filename for the generated HTML
      inject: 'body',               // Inject scripts into the body
      minify: {
        collapseWhitespace: true,   // Minify HTML
        removeComments: true,       // Remove comments
      },
    }),
  ],
  
  optimization: {
    chunkIds: 'named', // Use named chunk ids for better debugging
    minimize: true,    // Enable minimization
    minimizer: [new TerserPlugin()], // Use TerserPlugin for JavaScript minification
    splitChunks: {
      // Configuration for code splitting
      chunks: 'async', // Split async chunks
      minSize: 20000, // Minimum size for a chunk to be generated
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30, // Maximum async requests for a single entry point
      maxInitialRequests: 30, // Maximum initial requests
      enforceSizeThreshold: 50000, // Enforce minimum size threshold
      cacheGroups: {
        // Cache group for vendor libraries
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor', // Name of the vendor chunk
          chunks: 'all', // Include all chunks
          reuseExistingChunk: true, // Reuse existing chunks if possible
        },
        default: {
          minChunks: 1, // Minimum chunks for this group
          priority: -20,
          reuseExistingChunk: true, // Reuse existing chunks
          name: 'common', // Name of the common chunk
          chunks: 'all', // Include all chunks
        },
      },
    },
  },
  
  // Set the mode for the build process
  mode: 'production'
}
