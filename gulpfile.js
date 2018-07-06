var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 15 versions', '> 1%', 'ie 10', 'ie 9','ie 8','ie 7'] });

/* Task to compile less */
gulp.task('compile-less', function() {
    gulp.src('./assets/styles/less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./assets/styles/css/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
    gulp.watch('./assets/styles/less/*.less' , ['compile-less']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);