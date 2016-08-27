//watch tasks
function gf_watch(tasks_obj) {    
    var watcher = '//watch task\n' + 
        'gulp.task(\'watch\', function() {\n';

    for (var task in tasks_obj) {
        watcher += '\tgulp.watch(path.' + task + '.src, [\'' + task + '\']);\n';
    }

    watcher += '});';

//    return null;
    return watcher;
}