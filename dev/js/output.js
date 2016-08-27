var output = (function() {
    var gulpfile,
        npm_command;
    
    function set_gulpfile(new_file) {
        gulpfile = new_file;
    }
    
    function set_npm_command(new_string) {
        npm_command = new_string;
    }
    
    function get_gulpfile() {
        return gulpfile;
    }
    
    function get_npm_command() {
        return npm_command;
    }
    
    return {
        get: {
            gulp: get_gulpfile,
            npm: get_npm_command
        },
        set: {
            gulp: set_gulpfile,
            npm: set_npm_command
        }
    };

})();