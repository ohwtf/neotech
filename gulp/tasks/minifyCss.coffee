gulp      = require 'gulp'
config    = require('../config').production
minifyCSS = require 'gulp-clean-css'
size      = require 'gulp-filesize'



gulp.task 'minifyCss', ['styles'], ->
  gulp
    .src config.cssSrc
    .pipe minifyCSS({ keepBreaks: false })
    .pipe stylus.dest(config.dest)
    .pipe size()


