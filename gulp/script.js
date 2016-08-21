const path = require('path');
const uglify = require('gulp-uglify');
const rootPath = require('forthright48/world').rootPath;
const rename = require('gulp-rename');
const browserify = require('browserify');
const glob = require('glob');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const fs = require('fs');

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
      .pipe(source('vendor.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./public/js/vendor/'));
  });

  function browserified(filePath) {
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
      const destDir = path.dirname(destPath);

      // Get Modified Time
      const mtimeSource = fs.statSync(path.join(rootPath, filePath)).mtime;
      let mtimeDest;
      try {
        mtimeDest = fs.statSync(path.join(rootPath, destPath)).mtime;
      } catch (e) {
        mtimeDest = mtimeSource;
      }

      if (mtimeSource < mtimeDest) return;

      browserified(filePath)
        .pipe(gulp.dest(destDir))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
    });
    done();
  });
};
