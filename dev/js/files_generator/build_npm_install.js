//npm packages list
function npm_install(npm_obj) {
    var npm_list = 'npm install --save-dev gulp ';

    for (var plugin in npm_obj){
        npm_list += 'gulp-' + npm_obj[plugin] +' ';
    }
    npm_list = npm_list.slice(0, -1);
    
    output.set.npm(npm_list);      //save to output variable
}