module.exports = {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
        },
      ],
    },
  
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };