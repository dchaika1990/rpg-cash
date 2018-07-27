var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 15 versions', '> 1%', 'ie 10', 'ie 9','ie 8','ie 7'] });
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var minifyjs = require('gulp-js-minify');

/* Task to compile less */
gulp.task('compile-less', function() {
    gulp.src('./assets/styles/less/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(minifyCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./assets/styles/css/'));
});

gulp.task('minify-js', function(){
    gulp.src('./assets/scripts/main.js')
        .pipe(minifyjs())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./assets/scripts/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
    gulp.watch('./assets/styles/less/*.less' , ['compile-less']);
    gulp.watch('./assets/scripts/main.js' , ['minify-js']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);