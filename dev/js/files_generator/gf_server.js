//generate server task
function gf_server(server_obj) {
    if (server_obj.use !== null) {
        var p = plugins.get(server_obj.use, 'server'),
            livereload = server_obj.livereload == 'true' ? '\t\tlivereload: true,\n' : '';
        var server_task = '//project server\n' +
            'gulp.task(\''+ p.name + '\', function() {\n' +
            '\tconnect.' + p.methods[0] + '({\n' +
            '\t\troot: path.html.trg,\n' +
            livereload +
            '\t\tport: ' + server_obj.port + '\n' +
            '\t})\n' + 
            '});\n\n';

        return server_task;
        
    } else {
        return '';
    }
    
}