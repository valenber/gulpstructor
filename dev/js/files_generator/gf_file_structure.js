//record file structure
function gf_file_structure(require_obj) {
    //if js concat is used
    var concat_arr = '',
        js_src_setter = '';
    
    if (require_obj.indexOf('concat') !== -1) {
        concat_arr = 'var concat_order = [\n' +
                                    '//populate this array with paths to your JavaScript files in desired order of concatenation\n' +
                                    '];\n';
        js_src_setter = '\n//set JavaScript source path to concat_order array if it\'s not empty\n' + 
                        'path.js.src = concat_order.length !== 0 ? concat_order : \'dev/scripts/*.*\';';
    }
    
    var structure = '//file structure\n' +
        concat_arr + 
        'var path = {\n'+
        '\thtml: {\n'+
        '\t\tsrc: \'dev/*.*\',\n'+
        '\t\ttrg: \'pub/\'\n'+
        '\t},\n'+
        '\tcss: {\n'+
        '\t\tsrc: \'dev/styles/*.*\',\n'+
        '\t\ttrg: \'pub/css/\'\n'+
        '\t},\n'+
        '\tjs: {\n'+
        '\t\tsrc: \'dev/scripts/*.*\',\n'+
        '\t\ttrg: \'pub/js/\'\n'+
        '\t}\n'+
        '};' +
        js_src_setter;
    
    return structure;    
}




/*
        var concat_array = [];
        var path = {
            html: {
                src: 'dev/*.*',
                trg: 'pub/'
            },
            css: {
                src: 'dev/css/*.*',
                trg: 'pub/css/'
            },
            js: {
                src: 'dev/js/*.*',
                trg: 'pub/js/'
            }
        };
        path.js.src = concat_array !== [] ? concat_array : 'dev/js/*.*';
*/

var fs_root = {
    dev: {
        scripts: '*.*',
        styles: '*.*'
    },
    pub: {
        js: 0,
        css: 0,
        img: 0        
    }
};

function jszip_builder(fs_obj) {
//    proj.folder('dev').folder('scripts');
//    proj.folder('dev').folder('styles');
//    proj.folder('pub').folder('js');
//    proj.folder('pub').folder('css');
//    proj.folder('pub').folder('img');    
}


function fs_builder(fs_obj) {
    
}