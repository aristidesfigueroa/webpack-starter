const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const MinifyPlugin            = require('babel-minify-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'production', 
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },    
    output: {
        filename: 'main.[hash].js',        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
                // use: [
                //     'babel-loader',                                        
                // ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]                
            },            
            {
                test: /\.html$/i,                         
                loader: 'html-loader',                
                options: { 
                    attributes: false, 
                    minimize: false, // Esta es para minimizar el Html de Producción pero ahorita lo dejaremos false
                },     
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [        
        new CleanWebpackPlugin(),

        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({            
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' }
        ]}),
        new MinifyPlugin(),
        // new CleanWebpackPlugin()
        
        
    ]

}

