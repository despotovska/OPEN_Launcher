const helpers = require('./helpers');
// Webpack Plugins
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
    // Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
    //
    // Do not change, leave as is or it wont work.
    // See: https://github.com/webpack/karma-webpack#source-maps
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    helpers.root('node_modules')
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    helpers.root('node_modules/rxjs')
                ]
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    tsconfig: 'tsconfig.test.json'
                },
                exclude: [/\.e2e\.ts$/]
            },
            { test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('src/index.html')] },
            { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },
            { test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] }
        ],
        postLoaders: [
            // instrument only testing sources with Istanbul
            {
                test: /\.(js|ts)$/,
                include: helpers.root('src'),
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /mocks/,
                    /plugins/,
                    /node_modules/
                ]
            }
        ]
    },
    plugins: [
        // Environment helpers
        new DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'HMR': false
        })
    ],
    node: {
        global: 'window',
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src',
    }
};
