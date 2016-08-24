//gulpfile tasks

var gf_tasks = (function() {
    //build individual tasks
    function create_tasks(task_obj) {
        var tasks_list = '';
        
        for (var target in task_obj) {
            
            
            var ind_task = '//process ' + target + '\n' +
                'gulp.task(\'' + target + '\', function() {\n' +
                '\treturn gulp.src(path.' + target + '.src)\n';
            
            for (var pipe in task_obj[target]) {
                var pipe_data = task_obj[target][pipe];
                ind_task += new_pipe(pipe_data);
            }
            
            ind_task += '\t\t.pipe(gulp.dest(path.' + target + '.trg));\n' + '});\n\n';
            
            
            tasks_list += ind_task;
        }
        return tasks_list;
    }
    
    //pipes generator
    function new_pipe(data_obj) {        
        var name = data_obj.name,
            options = list_options(data_obj.options);
        
        return '\t\t.pipe(' + name + '(' + options + '))\n';
    }
    
    //list options
    function list_options(opts_arr) {
        if (opts_arr.length === 0) {
            return '';
        }
        var option_list = '';
        for (var i in opts_arr) {
            option_list += '' + opts_arr[i].name + ': \'' + opts_arr[i].value + '\'';

            if (i < opts_arr.length-1) {
                option_list += ',\n\t\t\t';
            }
        }
        return '\n\t\t\t{' + option_list + '}\n\t\t';
    }
    
    return {
        create: create_tasks
    };
})();

