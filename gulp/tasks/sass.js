'use strict';

//Препроцессор Sass
module.exports = function () {

    $.gulp.task('sass', function () {
        return $.gulp.src($.config.sourceFolderRoot + '/' + $.config.sourceFolderSass + '/' + $.config.sourceFileMainScss)
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sassGlob())
            .pipe($.gp.sass())
            .on('error', $.gp.notify.onError({
                title: 'Style'
            }))
            .pipe($.gp.autoprefixer({ browsers: $.config.autoPrefix }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.outputFolderRoot + '/' + $.config.outputFolderCss));
    });

};

