//npm packages list
function npm_install(gulp_obj) {
    var npm_list = 'Run this command in the root of the project to install required plugins:\n' + 
        'npm install --save-dev gulp ';

    for (var plugin in gulp_obj){
        npm_list += 'gulp-' + plugin +' ';
    }
    npm_list = npm_list.slice(0, -1);
    
    console.log(npm_list);
}