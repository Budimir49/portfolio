'use strict';

module.exports = function() {
  $.gulp.task('css:foundation', function() {
    return $.gulp.src($.config.pathNormalizeCss)
      .pipe($.gp.concatCss('foundation.css'))
      .pipe($.gp.csso())
      .pipe($.gulp.dest($.config.outputFolderRoot + '/' + $.config.outputFolderCss))
  })
};
