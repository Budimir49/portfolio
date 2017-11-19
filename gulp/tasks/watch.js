'use strict';

module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch($.config.sourceFolderRoot + '/' + $.config.sourceFolderSass + '/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch($.config.sourceFolderRoot + '/' + $.config.sourceFolderPug + '/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch($.config.sourceFolderRoot + '/' + $.config.sourceFolderJs + '/**/*.js', $.gulp.series('js:process'));
    });
};

