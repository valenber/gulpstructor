//generate requires text
function gf_require(req_obj) {
    var gulp_reqiure = '//required plugins\n'+
        'var gulp = require(\'gulp\'),\n';
    for (var i in req_obj){
        var plugin = req_obj[i];
        gulp_reqiure += '\t' + plugin +' = require(\'gulp-' + plugin + '\'),\n';
    }
    gulp_reqiure = gulp_reqiure.slice(0, -2) + ';';
    
//    console.log(gulp_reqiure);

    return gulp_reqiure;
}