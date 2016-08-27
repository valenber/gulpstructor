function gf_default(s_name) {
    var server = s_name !== null ? '\'' + s_name + '\', ' : '';
    return '//default task\n'+
            'gulp.task(\'default\', ['+ server + '\'watch\']);';
}


//gulp.task('default', ['connect', 'watch']);