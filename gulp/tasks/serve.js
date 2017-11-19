'use strict';

//Live reloaded
module.exports = function () {
    $.gulp.task('serve', function () {
        $.browserSync.init({
            open: true,
            server: $.config.outputFolderRoot
        });
        $.browserSync.watch($.config.outputFolderRoot, $.browserSync.reload);
    });
};

