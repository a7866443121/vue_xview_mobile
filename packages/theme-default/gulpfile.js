'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass'); 
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var salad = require('postcss-salad')(require('./salad.config.json'));

gulp.task('compile', function() {
	 var processors = [
        autoprefixer,
        cssnano,
        salad
    ];
	
  return gulp.src('./src/*.scss')
  	.pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
});


gulp.task('build', ['compile', 'copyfont']);
gulp.task('watch', function () {
  gulp.watch('./src/*.scss', ['compile']);
});
