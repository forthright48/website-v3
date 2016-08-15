const path = require('path');
const pump = require('pump');
const resolveDependencies = require('gulp-resolve-dependencies');
const concat = require('gulp-concat');
const globToVinyl = require('glob-to-vinyl');
const recursive = require('gulp-recursive-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const config = require('./config.js');
const rootPath = require('forthright48/world').rootPath;

module.exports = function(gulp) {
  let dependencyCounter;

  function solveDependency(file, len, done) {
    const relative = path.relative(path.join(rootPath, 'src'), file);
    pump([
      gulp.src(file),
      resolveDependencies({
        pattern: /\* @requires [\s-]*(.*\.js)/g,
        log: true
      }),
      concat(relative),
      babel({
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }),
      uglify(),
      gulp.dest(config.path.dirs.public)
    ], function() {
      dependencyCounter++;
      if (dependencyCounter === len) done();
    });
  }

  gulp.task('script', function(done) {
    dependencyCounter = 0;
    globToVinyl(config.path.js, function(err, files) {
      if (files.length === 0) {
        return done();
      }
      for (const file in files) {
        solveDependency(files[file].path, files.length, done);
      }
    });
  });
};
