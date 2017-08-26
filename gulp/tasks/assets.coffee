changed    = require 'gulp-changed'
gulp       = require 'gulp'
imagemin   = require 'gulp-imagemin'
config     = require('../config').assets


gulp.task 'assets', ->
  gulp
    .src config.src
    .pipe changed(config.dest)
    .pipe gulp.dest(config.dest)