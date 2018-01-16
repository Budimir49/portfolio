'use strict';

module.exports = function() {
    $.gulp.task('js:desktop', function() {
        return $.gulp.src($.config.sourceFolderRoot + '/' + $.config.sourceFolderJs + '/water.js')
            .pipe($.gp.concat('desktop.js'))
            .pipe($.gulp.dest($.config.outputFolderRoot + '/' + $.config.outputFolderJs))
    })
};
