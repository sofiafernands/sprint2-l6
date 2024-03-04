const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = (_, argv) => ({
    entry: './src/index.js', // Archivo de entrada
    output: {
        filename: '[name].bundle.js', // Archivo de salida
        path: path.resolve(__dirname, 'dist'),
    },
    experiments: { // Habilitar el uso de módulos ESM
        outputModule: true,
    },
    devServer: { // Configuración del servidor de desarrollo
        port: 3000,
        historyApiFallback: true,
    },
    devtool: argv.mode === 'development' ? 'source-map' : 'false', // Generar source maps
    module: {
        rules: [
            {
                test: /\.m?js$/, // Cargar archivos JS y JSX
                exclude: /node_modules/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|mjs|jsx)$/, // Cargar archivos JS y JSX
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css|s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader',
                    'sass-loader',
                ]
            },
            { // Cargar imágenes    
                test: /\.(png|jpg|jpeg|gif|svg|ico|ttf|woff|woff2)$/i,
                type: 'asset/resource', // Cargar archivos como recursos
                exclude: /node_modules/,
                generator: {
                    filename: 'assets/[name][ext]' // Carpeta de salida
                }
            },
            {
                test: /\.html$/i, // Cargar archivos HTML
                loader: 'html-loader',
                exclude:/node_modules/,

            }
            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'module',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin({ // Copiar archivos de la carpeta src/img a dist/assets
            patterns: [
                { from: './src/img', to: 'assets' } // Copiar archivos de la carpeta src/assets a dist/assets
            ]
        })
    ],
});