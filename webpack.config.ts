import * as webpack from "webpack";
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from "path";


const environment = process.env.NODE_ENV || 'development';

interface Config extends webpack.Configuration {
  module: {
    rules: NewUseRule[]
  };
}

interface NewUseRule extends webpack.NewUseRule {
  use: webpack.NewLoader | webpack.NewLoader[];
}

const rules: NewUseRule[] = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "ts-loader"
    }
  }
];

const resolve: webpack.Resolve = {
  alias: {
    'reenhance-components': path.resolve(__dirname, 'src/index'),
  },
  extensions: ['.ts', '.tsx', '.js', '.jsx']
};

const devConfig: Config = {
  resolve,
  module: { rules },
  entry: path.join(__dirname, "./examples/src/app.tsx"),
  output: {
    path: path.join(__dirname, "./examples/dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/index.html')
    }) as any
  ]
};

var PATHS = {
  entryPoint: path.resolve(__dirname, 'src/index.ts'),
  bundles: path.resolve(__dirname, '_bundles'),
}

const prodConfig: Config = {
  resolve,
  module: { rules },
  entry: {
    'reenhance-components': [PATHS.entryPoint],
    'reenhance-components.min': [PATHS.entryPoint]
  },
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'reenhance-components',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false
    })
  ]
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default config;
