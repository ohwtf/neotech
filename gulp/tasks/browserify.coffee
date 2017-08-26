browserify   = require 'browserify'
watchify     = require 'watchify'
mergeStream  = require 'merge-stream'
bundleLogger = require '../util/bundleLogger'
gulp         = require 'gulp'
handleErrors = require '../util/handleErrors'
source       = require 'vinyl-source-stream'
config       = require('../config').browserify;
_            = require 'lodash'


browserifyTask = (devMode) ->
  browserifyThis = (bundleConfig) ->
    if devMode
      _.extend(bundleConfig, watchify.args, {debug: true})
      bundleConfig = _.omit(bundleConfig, ['external', 'require'])

#    b = browserify(bundleConfig).plugin(tsfy, {target: 'ES6', module: 'commonjs'})
    b = browserify(bundleConfig)

    bundle = ->
      bundleLogger.start(bundleConfig.outputName)
      b
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(gulp.dest(bundleConfig.dest))


    if devMode
      b = watchify(b)
      b.on('update', bundle)
      bundleLogger.watch(bundleConfig.outputName)
    else
      if bundleConfig.require then b.require(bundleConfig.require)
      if bundleConfig.external then b.external(bundleConfig.external)


    bundle()

  mergeStream.apply(gulp, _.map(config.bundleConfigs, browserifyThis))


gulp.task 'browserify', ->
  browserifyTask()


module.exports = browserifyTask