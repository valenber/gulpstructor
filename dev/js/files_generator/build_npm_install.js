//npm packages list
function npm_install(npm_obj) {
    var npm_list = 'npm install --save-dev gulp ';
    
    for (var i in npm_obj){
        var pluging = npm_obj[i];
        
        if (pluging.substring(0, 4) === 'dep_') {
            npm_list += pluging.substring(4) + ' ';
        } else {
            npm_list += 'gulp-' + pluging + ' ';
        }
    }
    npm_list = npm_list.slice(0, -1);
    
    output.set.npm(npm_list);      //save to output variable
}