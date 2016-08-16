//gulpfile tasks

var bg_task = (function() {
    //build individual tasks
    function create_task(task_obj) {
        var name = task_obj.name,
            target = task_obj.target,
            options = list_options(task_obj.options);

        var task = '//compile ' + target + '\n'+
            'gulp.task(\'' + name + '\', function() {\n' + 
            '\treturn gulp.src(path.' + target + '.src)\n' +
            new_pipe('task', [name, options]) +
            new_pipe('dest', [target]) +
            '});\n\n';

        return task;
    }
    
    //pipes generator
    function new_pipe(type, data_arr) {
        if (type === 'dest') {
            var target = data_arr[0];
            return '\t\t.pipe(gulp.dest(path.' + target +'.trg))\n';
        } else {
            var name = data_arr[0],
                options = data_arr[1];
            return '\t\t.pipe(' + name + '(' + options + '))\n';
        }
    }
    
    //list options
    function list_options(opts_arr) {
        if (opts_arr.length === 0) {
            return '';
        }
        var option_list = '';
        for (var i in opts_arr) {
            option_list += '\t\t\t' + opts_arr[i].name + ': \'' + opts_arr[i].value + '\'';

            if (i < opts_arr.length-1) {
                option_list += ',\n';
            }
        }
        return '{\n' + option_list + '\n\t\t}';
    }
    
    return {
        create: create_task
    };
})();

