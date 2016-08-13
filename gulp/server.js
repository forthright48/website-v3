const browsersync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const config = require('./config.js');

module.exports = function(gulp) {
  gulp.task('nodemon', function(cb) {
    let callbackCalled = false;
    return nodemon({
      script: './index.js'
    }).on('start', function() {
      if (!callbackCalled) {
        callbackCalled = true;
        cb();
      }
    });
  });

  gulp.task('browser-sync', gulp.series('nodemon', function() {
    return browsersync.init({
      proxy: 'http://localhost:8002',
      files: config.path.browsersync
    });
  }));
};
