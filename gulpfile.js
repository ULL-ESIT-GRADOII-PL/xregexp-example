var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('download', function () {
  return gulp.src('').pipe(shell(["curl http://xregexp.com/v/3.1.0/xregexp-all.js -s -O"]));
});

// npm install -g http-server
gulp.task('default', function() {
  return gulp.src('').pipe(shell(['http-server']));
});

