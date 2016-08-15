const path = require('path');
const rootPath = require('forthright48/world').rootPath;
const config = require('./config.js');

const filesToCopy = [
  path.join(rootPath, 'node_modules/jquery/dist/jquery.js')
];

module.exports = function(gulp) {
  gulp.task('copy', function(done) {
    return gulp.src(filesToCopy)
      .pipe(gulp.dest(config.path.vendor.js));
  });
};
