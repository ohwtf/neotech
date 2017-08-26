gulp     = require 'gulp'
config   = require '../config'


gulp.task 'watch', ->
  gulp.watch config.stylus.src_watch, ['styles']
  if config.typescript
    gulp.watch config.typescript.src,  ['ts-lint', 'compile-ts']
    gulp.watch config.html.src,  ['aot']
