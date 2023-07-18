import gulp from 'gulp';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass'
import sass from 'sass'

const sassModule = gulpSass(sass)



const PATH = {
    dev: {
        index: './',
        img: 'img/*',
        scss: './scss/*',
        css: './css/',
        css_libs: './css/libs/*.css',
        js: './js/*js',
        files: './files/**/*'
    },
    dist: {
        index: 'dist/',
        img: 'dist/img',
        css: 'dist/css',
        js: 'dist/js',
        files: 'dist/files'
    }
}



gulp.task('watch', function () {
    gulp.watch(PATH.dev.scss, gulp.series('scss'))
})

gulp.task('scss', function () {
    return gulp.src(PATH.dev.scss)
        .pipe(sassModule().on('error', sassModule.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(PATH.dev.css))
})

gulp.task('css-libs', gulp.series(
    function () {
        return gulp.src(PATH.dev.css_libs)
            .pipe(cssnano())
            .pipe(rename({ suffix: '.min' }))
}));


gulp.task('image', function (done) {
    gulp.src(PATH.dev.img).pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoplugins: [{ removeViewBox: false }],
        use: [pngquant()]
    }))).pipe(gulp.dest(PATH.dist.img));
    done();
})


gulp.task('build', gulp.series('image', 'scss', 'css-libs' , function (done) {
    gulp.src(PATH.dev.css + 'main.min.css').pipe(gulp.dest(PATH.dist.css));
    gulp.src(PATH.dev.css + 'css/libs/*min.css').pipe(gulp.dest(PATH.dist.css));
    gulp.src(PATH.dev.index + 'index.html').pipe(gulp.dest(PATH.dist.index));
    gulp.src(PATH.dev.js).pipe(gulp.dest(PATH.dist.js));
    gulp.src(PATH.dev.files).pipe(gulp.dest(PATH.dist.files));
    done();
}));

