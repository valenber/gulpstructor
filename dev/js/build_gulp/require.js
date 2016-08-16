//generate requires text
function bg_require(gulp_obj) {
    var gulp_reqiure = '//required plugins\n'+
        'var gulp = require(\'gulp\'),\n';
    for (var plugin in gulp_obj){
        gulp_reqiure += '\t' + plugin +' = require(\'gulp-' + plugin + '\'),\n';
    }
    gulp_reqiure = gulp_reqiure.slice(0, -2) + ';';

    return gulp_reqiure;
}