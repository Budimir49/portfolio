'use strict';

module.exports = function() {
  $.gulp.task('js:foundation', function() {
    return $.gulp.src($.config.pathjQuery)
      .pipe($.gp.concat('foundation.js'))
      .pipe($.gulp.dest($.config.outputFolderRoot + '/' + $.config.outputFolderJs))
  })
};
