gulp    = require 'gulp'
config  = require('../config').production
size    = require 'gulp-filesize'
uglify  = require 'gulp-uglify'
gutil   = require 'gulp-util'

gulp.task 'uglifyJS', ['browserify'], ->
  gulp
    .src config.jsSrc
    .pipe uglify().on('error', gutil.log)
    .pipe gulp.dest(config.dest)
    .pipe size()