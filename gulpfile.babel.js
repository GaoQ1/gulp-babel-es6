import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

/*browserify的配置文件*/
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();


gulp.task('scripts', () => {
    return gulp.src('src/scripts/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dest/scripts'));
});

function lint(files, options) {
    return () => {
        return gulp.src(files)
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    };
}

gulp.task('lint', lint('dest/scripts/*.js'));

gulp.task('watch',() =>{
    gulp.watch('src/scripts/*.js',['scripts']);
});

gulp.task('default', ['watch']);