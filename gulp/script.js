const path = require('path');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const config = require('./config.js');
const rootPath = require('forthright48/world').rootPath;

const browserify = require('browserify');
const glob = require('glob');
const source = require('vinyl-source-stream');

const vendors = ['jquery', 'moment'];

module.exports = function(gulp) {

  gulp.task('build:vendor', function() {
    const b = browserify({
      debug: true
    });

    // require all libs specified in vendors array
    vendors.forEach(function(lib) {
      b.require(lib, {
        expose: lib
      });
    });

    return b.bundle()
      .pipe(source('vendor.js'))
      .pipe(gulp.dest('./public/js/vendor/'));
  });

  function browserified(filePath) {
    console.log(filePath);
    const fileName = path.basename(filePath);
    return browserify(filePath)
      .external(vendors)
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle()
      .pipe(source(fileName));
  }

  gulp.task('script', function(done) {
    const filePathArray = glob.sync('./src/js/**/*.js');
    filePathArray.forEach(function(filePath) {
      let destPath = path.relative(path.join(rootPath, 'src'), filePath);
      destPath = path.join('./public', destPath);
      destPath = path.dirname(destPath);
      browserified(filePath)
        .pipe(gulp.dest(destPath));
    });
    done();
  });
};
