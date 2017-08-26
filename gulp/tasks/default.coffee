gulp = require 'gulp'

gulp.task 'default', ['styles', 'assets' ,'watch', 'ts-lint', 'compile-ts']