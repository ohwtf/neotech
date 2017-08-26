gulp = require('gulp')
del = require('del')
tsc = require('gulp-typescript')
sourcemaps = require('gulp-sourcemaps')
tsProject = tsc.createProject('tsconfig.json')
exec = require('child_process').exec;
tslint = require('gulp-tslint')
runSequence = require('run-sequence');
config = require('../config').typescript


gulp.task('ts-lint', () ->
    if config
      return gulp.src(config.src)
              .pipe(tslint({
                formatter: 'stylish'
              }))
              .pipe(tslint.report({
                emitError: false
              }))
)

gulp.task('compile-ts', (cb) ->
    if config
      tsResult = gulp.src(config.src)
                 .pipe(sourcemaps.init())
                 .pipe(tsProject({
                    allowJs: true
                  }))

      tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.dest))

      return runSequence('aot', cb);
)

gulp.task('aot', () ->
  exec('npm run aot-rollup')
)














