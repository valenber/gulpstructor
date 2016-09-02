//record file structure
function gf_file_structure(require_obj) {
    var concat_arr = '',
        js_src_setter = '',
        fs_template = {     //file structure in gulpfile is based on this object
            path: {
                html: {
                    src: fs_folders.src.root,
                    trg: fs_folders.trg.root
                },
                css: {
                    src: fs_folders.src.css,
                    trg: fs_folders.trg.css
                },
                js: {
                    src: fs_folders.src.js,
                    trg: fs_folders.trg.js
                }
            }
        };
    
    //if js concat is used
    if (require_obj.indexOf('concat') !== -1) {
        concat_arr = 'var concat_list = [' +
                    '\n//populate this array with names of your JavaScript files' + 
                    '\n//in desired order of concatenation' +
                    '\n];\n';
        js_src_setter = '\n//set JavaScript source path to concat_order array' + 
                        '\n//if it\'s not empty' +
                        '\nvar concat_order = concat_list.map(function(el) {' +
                            '\n\t//if file extention was ommited' +
                            '\n\tvar ext = el.split(\'.\').length > 1 ? \'\' : \'.js\';' + 
                            '\n\treturn (path.js.src).slice(0, -3) + el + ext;' +
                        '\n});' +
                        '\nif (concat_list.length !== 0) path.js.src = concat_order;';
    }

    //generates file structure for gulpfile
    function fs_builder(fs_obj) {       
        var fs = fs_obj.path,
            structure = 'var path = {\n';
        for (var i in fs) {
            structure += '\t' + i + ': {\n';
            for (var j in fs[i]) {
                var end = j === 'src' ? '*.*\',' : '\'',
                    parent = i !== 'html' ? fs.html[j] + '/' : '';
                structure += '\t\t' + j + ': \'' + parent + fs[i][j] + '/'+ end + '\n';
            }
            structure += '\t},\n';
        }
        structure = structure.slice(0, -2);  //remove unnecessary last comma
        structure += '\n};'     //close object bracket

        return structure;
    }
    
    var structure = '//file structure\n' +
        concat_arr + 
        fs_builder(fs_template) +
        js_src_setter;
    
    return structure;    
}

var fs_folders = {      //folder names are taken from this object
    src: {              //used by gf_file_structure and JSZip
        root: 'dev',
        js: 'scripts',
        css: 'styles'
    },
    trg: {
        root: 'pub',
        js: 'js',
        css: 'css'
    }
}

