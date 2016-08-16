//watch tasks
function bg_watch(gulp_obj) {
    var watcher = '//watch task\n' + 
        'gulp.task(\'watch\', function() {\n';

    for (var task in gulp_obj) {
        watcher += '\tgulp.watch(path.' + gulp_obj[task].target + '.src, [\'' + task + '\']);\n';
    }

    watcher += '});';

    return watcher;
}