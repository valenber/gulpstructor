var build = (function() {
    
    //main generator
    function gulp_file(obj) {
        var gulpfile = gf_require(obj.require) + '\n\n' +
            gf_file_structure + '\n\n' +
            gf_server(obj.server) + '\n\n' +
            gf_tasks.create(obj.tasks) +
            gf_watch(obj.tasks) + '\n\n' +
            gf_default(obj.server.use); 
        
        output.set.gulp(gulpfile);      //save to output variable
    }  
    
    return {
        gulp_file: gulp_file
    };
    
})();
