changed    = require 'gulp-changed'
gulp       = require 'gulp'
imagemin   = require 'gulp-imagemin'
config     = require('../config').images


gulp.task 'images', ->
  gulp
    .src config.src
    .pipe changed(config.dest)
    .pipe imagemin()
    .pipe gulp.dest(config.dest)