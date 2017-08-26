gulp = require 'gulp'

gulp.task 'production', ->
  gulp.start ['uglifyJS']
