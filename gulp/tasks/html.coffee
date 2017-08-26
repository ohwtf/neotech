gulp = require('gulp')
config = require('../config').html
changed = require 'gulp-changed'

gulp.task 'html', ->
  gulp
    .src config.src
    .pipe changed(config.dest)
    .pipe gulp.dest(config.dest)
