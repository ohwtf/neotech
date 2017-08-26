gulp         = require 'gulp'
stylus       = require 'gulp-stylus'
handleErrors = require '../util/handleErrors'
config       = require('../config').stylus
autoprefixer = require 'gulp-autoprefixer'
minifyCSS    = require 'gulp-clean-css'
sourcemaps   = require 'gulp-sourcemaps'
gulpCssPreprocessor = require 'gulp-css-preprocessor';
gulpConcatCss = require 'gulp-concat-css'



gulp.task 'styles', ->
  styles = gulp
    .src config.src
    .pipe sourcemaps.init()
    .pipe gulpCssPreprocessor({
      stylus: {
        filename: 'index.styl'
      }
    })
    .pipe gulpConcatCss('index.css')
    .on 'error', handleErrors
    .pipe autoprefixer 'last 2 versions'
    .pipe minifyCSS({ keepBreaks: false })
    .pipe sourcemaps.write()
    .pipe gulp.dest config.dest

  return styles



