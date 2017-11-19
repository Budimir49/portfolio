'use strict';

//Удаление выходной папки
module.exports = function () {

    $.gulp.task('clean', function () {
        return $.del([
            $.config.outputFolderRoot + '/css',
            $.config.outputFolderRoot + '/js'
        ]);
    });
};

