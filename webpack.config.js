const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './public/js/bundle.js', // Assuming 'main.js' is your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // If you have CSS files to process
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp4|png|jpg|gif)$/, // Handling video and image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use your HTML file as the template
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/video', to: 'video' }, // Copy the video folder to 'dist'
      ],
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
