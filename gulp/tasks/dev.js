const gulp = require('gulp');
const config = require('../config');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

const { paths } = config;

// Get one .less file and render
function css() {
  return gulp.src(paths.less)
    .pipe(plugins.plumber())
    .pipe(plugins.rename('main.min.css'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      compress: false,
    }))
    .pipe(plugins.sourcemaps.write(''))
    .pipe(gulp.dest(paths.dev));
}

function html() {
  return gulp.src(paths.devf.pug)
    .pipe(plugins.plumber())
    .pipe(plugins.rename('index.html'))
    .pipe(plugins.pug())
    .pipe(gulp.dest(paths.dev));
}

function copy() {
  return gulp.src(paths.copy)
    .pipe(gulp.dest(paths.dev));
}

// Static server
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dev,
      index: 'index.html',
    },
    browser: ['google chrome', 'chrome'],
  });

  gulp.watch(paths.lessWatch, css);
  gulp.watch(paths.pug, html);
}

module.exports = gulp.series(html, copy, serve);
