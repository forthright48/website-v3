module.exports = {
  path: {
    dirs: {
      public: './public',
      temp: './temp',
      output: './public'
    },
    pug: './views/**/*.pug',
    image: './src/**/*.{JPG,jpg,png,gif}',
    css: [
      './node_modules/@forthright48/simplecss/src/*.css',
      './src/**/*.css'
    ],
    js: './src/**/*.js',
    vendor: {
      js: './src/js/vendors'
    },
    browsersync: ['./public/**/*.css', './public/**/*.js', 'views/**/*.pug']
  }
};
