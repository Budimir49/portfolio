'use strict';

module.exports = function() {
  $.gulp.task('js:process', function() {
    return $.gulp.src($.config.sourceFolderRoot + '/' + $.config.sourceFolderJs + '/app.js')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat('main.js'))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.outputFolderRoot + '/' + $.config.outputFolderJs))
  })
};
