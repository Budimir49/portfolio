module.exports = {
    outputFolderRoot : './build', //Папка для компиляции
    outputFolderCss :  'css', //Выходная подпапка для css
    outputFolderJs :  'js', //Выходная подпапка для js


    sourceFolderRoot : './source', //Папка с исходными данными
    sourceFolderSass : 'style', //Подпапка с sass файлами
    sourceFileMainScss : 'main.scss', //Точка входа всех scss-файлов

    sourceFolderPug : 'template', //Подпапка с pug файлами

    sourceFolderJs : 'js', //Подпапка с js файлами

    autoPrefix: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],

    pathNormalizeCss:  './node_modules/normalize.css/normalize.css',
    pathjQuery:  './node_modules/jquery/dist/jquery.min.js',

    skills : {
        "skills" : [
            {
                "Frontend" : ['HTML5', 'CSS3', 'JavaScript & jQuery']
            },
            {
                "Backend" : ['PHP', 'MySQL', 'Node.js & npm', 'Mongo.db']
            },
            {
                "WorkFlow" : ['Git', 'Gulp', 'Bower']
            }
        ]
    }
};