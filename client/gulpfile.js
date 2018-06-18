'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var run = require('gulp-run');

var SCSS_SRC = './Assets/scss/**/*.scss';
var SCSS_DEST = './src/css';

// Compiler le sassnpm inst
gulp.task('sass', function() {
  return gulp
    .src(SCSS_SRC)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(SCSS_DEST));
});

//Detect changement SASS
gulp.task('watch', function() {
  return gulp.watch(SCSS_SRC, ['sass']);
});

// Lance npm start
gulp.task('start', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.map']).pipe(run('npm start'));
});

// Lance npm start
gulp.task('starte', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.map']).pipe(run('node ../auth-server/authorization_code/app.js'));
});


//Run
gulp.task('default', ['start', 'starte', 'watch']);