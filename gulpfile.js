/* These are the required packages needed to carry out the Gulp Task Below. */
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babel = require('gulp-babel');
const babelify = require("babelify");
const imagemin = require('gulp-imagemin');
const nodemon = require('gulp-nodemon');
const browserifyCss = require('browserify-css');
const scssify = require('scssify');
const watchify = require('watchify');
const notify = require("gulp-notify");
//const mocha = require('gulp-mocha');
const uglify = require('gulp-uglify');
//const cleanCSS = require('gulp-clean-css');
const del = require('del');
const pump = require('pump');
const ROOT_DEV_PATH = './src/public/';
const ROOT_PROD_PATH = './lib/public/';
  
gulp.task('browserify', () => {
    return browserify('./src/public/js/index.js')
    .transform(scssify)
    .transform(babelify.configure({
        presets : [ 'es2015', 'stage-2', 'react' ]
    }))
    .transform(browserifyCss, {
        poll : true
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./lib/public/js/'))
});

gulp.task('minify-css-styles', () => {
    pump([
        gulp.src('./src/public/styles/**/*'),
        gulp.dest('./lib/public/styles'),
    ]);
});

gulp.task('client_watch', () => {
    // gulp.watch(['./src/public/js/**/*.js'], ['watchify']);
    gulp.watch(['./src/public/styles/**/*'], ['minify-css-styles']);
});

gulp.task('default', () => {
    let b = browserify(Object.assign({
        entries: ['./src/public/js/index.js'],
        cache: {},
        packageCache: {},
        debug: false,
        fullPaths: true
    }));

    let w = watchify(b.transform(babelify.configure({
        ignore : /(node_modules)/,
        presets : [ 'es2015', 'stage-2', 'react' ]
    })));

    w.on('log', function(data) {
        console.log(data);
    });

    w.on('update', (a)=>{
        bundle(b);
    });
    bundle(w);
});

function bundle(b) {
    // transform added to bundle process for watch then every time code gets appended 
    // and bundling slows down 
    return b.bundle()
    .on('error', (err) => {return notify().write(err);})
    .pipe(source('bundle.js')) 
    .pipe(gulp.dest('./lib/public/js/'));
}

gulp.task('build', ['browserify']);
gulp.task('watch', ['default', 'client_watch']);