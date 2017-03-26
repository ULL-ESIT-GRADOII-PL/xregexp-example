var gulp  = require('gulp');
var shell = require('gulp-shell');

// downloads last version of xregexp for the browser
gulp.task('download', shell.task(["curl https://raw.githubusercontent.com/slevithan/xregexp/master/xregexp-all.js -O"]));

// visit http://localhost:8080
gulp.task('default', ['pruebasxregexp.js'], shell.task(['node_modules/.bin/http-server']));

gulp.task('pruebasxregexp.js', shell.task(["sed -e '1 d' example.js > pruebasxregexp.js"]));

// >= 7.7.4
gulp.task('debug-node', shell.task(['node --inspect-brk example.js']));

gulp.task('node', shell.task(['node example.js']));

// npm install -g browserify
// visit browserified.html
gulp.task('browserify', shell.task(['browserify example.js -o main.js']));


// npm install -g webpack
// visit browserified.html
gulp.task('webpack', shell.task(['webpack example.js main.js']));

