exports= {
  test: /\.less$/,
  use: [{
      loader: 'style-loader'
  }, {
      loader: 'css-loader'
  }, {
      loader: 'less-loader'
  }]
},{
  test: /\.scss$/,
  use: [{
      loader: 'style-loader'
  }, {
      loader: 'css-loader'
  }, {
      loader: 'sass-loader'
  }]
}