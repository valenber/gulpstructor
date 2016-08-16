var build = (function() {

    //main generator
    function gulp_file(obj) {
        var gulpfile = bg_require(obj) + '\n\n' +
            bg_file_structure + '\n\n' +
            build_tasks(obj) +
            bg_watch(obj) + '\n\n'; 
        
        console.log(gulpfile);
    }
    
    function build_tasks(gulp_obj) {
        var tasks_list = '';

        for (var task in gulp_obj) {
            tasks_list += bg_task.create(gulp_obj[task]);
        }

        return tasks_list;
    }    
    
    return {
        gulp_file: gulp_file
    };
    
})();

