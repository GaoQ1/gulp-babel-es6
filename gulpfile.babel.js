import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

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