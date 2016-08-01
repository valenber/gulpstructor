//plugin library
var plib = (function() {
    var library = {
        structure: [pl_pug],
        style: [pl_sass, pl_postcss],
        script: [pl_concat]
    }
    
    //Cache DOM    
    var dom_cache = {
        structure: {lang: getme('#structure_lang'), opts: getme('#structure_opts')},
        style: {lang: getme('#style_lang'), opts: getme('#style_opts')},
        script: {lang: getme('#script_lang'), opts: getme('#script_opts')}
    };
    
    function build_item(plugin_obj) {
        return '<li data-pl_name="' + plugin_obj.pl_name + '">' + plugin_obj.title + '</li>'
    }
    
    function render_html() {
        for (section in library) {
            var cur_section = library[section],
                cur_section_name = section,
                lang_ul = dom_cache[section].lang,
                opts_ul = dom_cache[section].opts;
            
            for (plugin in cur_section) {
                var cur_plugin = cur_section[plugin];
                if (cur_plugin.type == 'lang') {
                    lang_ul.innerHTML = lang_ul.innerHTML + build_item(cur_plugin)
                } else {
                    opts_ul.innerHTML = opts_ul.innerHTML + build_item(cur_plugin)
                }
            }            
        }
    }
    
    return {
        render: render_html
    }
})();

// init
plib.render() 