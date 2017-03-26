var gulp  = require('gulp');
var shell = require('gulp-shell');

// downloads last version of xregexp for the browser
gulp.task('download', shell.task(["curl https://raw.githubusercontent.com/slevithan/xregexp/master/xregexp-all.js -O"]));

gulp.task('default', shell.task(['node_modules/.bin/http-server']));

// >= 7.7.4
gulp.task('debug-node', shell.task(['node --inspect-brk example.js']));

gulp.task('node', shell.task(['node example.js']));

