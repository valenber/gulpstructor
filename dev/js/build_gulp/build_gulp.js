var build = (function() {

    //main generator
    function gulp_file(obj) {
        var gulpfile = gf_require(obj.require) + '\n\n' +
            gf_file_structure + '\n\n' +
            gf_tasks.create(obj.tasks) +
            gf_watch(obj.tasks) + '\n\n'; 
        
        console.log(gulpfile);
    }  
    
    return {
        gulp_file: gulp_file
    };
    
})();

