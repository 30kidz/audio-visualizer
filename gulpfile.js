var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    assign = require('lodash.assign'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber');
const SRC = './src';
const DEST = './dist';

var paths = {
  js: [`${SRC}/**/*.js`]
}

var customOpts = {
  entries: [`${SRC}/app.js`],
  transform: [
    [
      'babelify', {
        presets: ['es2015']
      }
    ]
  ],
  debug: true
},
opts   = assign({}, watchify.args, customOpts),
b      = watchify(browserify(opts)),
bundle = () => {
  return b.bundle()
    .on('error',  gutil.log.bind(gutil), 'Browserify Error')
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(DEST));
}

gulp.task('browserify', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

gulp.task('watch', () => {
  gulp.watch(`${SRC}/**/*`, ['browserify']);
});

gulp.task('default', ['watch']);
