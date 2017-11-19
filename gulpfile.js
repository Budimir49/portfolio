'use strict';

global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
    config: require('./gulp/config'),
    gulp: require('gulp'),
    del: require('del'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create()
};

$.path.task.forEach((function (taskPath) {
    require(taskPath)();
}));

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js:process',
        'css:foundation'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));