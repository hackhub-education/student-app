var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var browserSync = require('browser-sync').create();


gulp.task('default', ['sass'], function() {
    browserSync.init({
        proxy: "localhost:3000"
    });
    gulp.watch('./src/sass/*.scss', ['sass']);
    gulp.watch('./views/*.html').on('change', browserSync.reload);
    gulp.watch('./views/*.pug').on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./statics/css'))
        .pipe(browserSync.stream());
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('./src/js/*.js'),
            uglify(),
            gulp.dest('./statics/js/')
        ],
        cb
    );
});