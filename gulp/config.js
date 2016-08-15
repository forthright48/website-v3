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
      './src/**/*.css',
      './node_modules/@forthright48/simplecss/src/*.css'
    ],
    js: './src/**/*.js',
    vendor: {
      components: {
        all: 'src/**/vendor/**/*.*',
        js: 'src/**/vendor/**/*.js',
        nonJs: [
          'app/**/vendor/**/*',
          '!app/**/vendor/**/*.js'
        ]
      }
    },
    browsersync: ['./public/**/*.css', './public/**/*.js', 'views/**/*.pug']
  }
};
