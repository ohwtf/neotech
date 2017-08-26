browserifyTask = require './browserify'
gulp           = require 'gulp'

gulp.task 'watchify', ->
  browserifyTask(true)

