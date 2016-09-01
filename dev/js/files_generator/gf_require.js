//generate requires text
function gf_require(req_obj) {
    var gulp_reqiure = '//required plugins\n'+
        'var gulp = require(\'gulp\'),\n';
    for (var i in req_obj){
        var plugin = req_obj[i];
        if (plugin.substring(0, 4) !== 'dep_') {        //exclude dependencies
            gulp_reqiure += '\t' + plugin +' = require(\'gulp-' + plugin + '\'),\n';
        }
    }
    gulp_reqiure = gulp_reqiure.slice(0, -2) + ';';

    return gulp_reqiure;
}