//plugin library
var plib = (function() {
    //categorized list of plugins
    var library = {
        structure: [pl_html, pl_php, pl_pug],
        style: [pl_css, pl_sass, pl_postcss],
        script: [pl_js, pl_typescript, pl_concat]
    }
    
    //Cache DOM    
    var dom_uls = {
        structure: {lang: getme('#structure_lang'), opts: getme('#structure_opts')},
        style: {lang: getme('#style_lang'), opts: getme('#style_opts')},
        script: {lang: getme('#script_lang'), opts: getme('#script_opts')}
    };
    
    var dom_descr = {
        structure: {lang: getme('#descr_structure_lang'), opts: getme('#descr_structure_opts')},
        style: {lang: getme('#descr_style_lang'), opts: getme('#descr_structure_opts')},
        script: {lang: getme('#descr_script_lang'), opts: getme('#descr_structure_opts')}
    };
    
    function build_lang_btn(plugin, section) {
        return '<li> \
        <input type="radio" name="' + section + '_lang" value="' + plugin.pl_name + '" id="' + plugin.pl_name + '"> \
        <label for="' + plugin.pl_name + '">' + plugin.title + '</label> \
        </li>'
    }
    
    function build_opts_card(plugin) {
        return '<li><label for="' + plugin.pl_name + '" class="opts_lbl">' + plugin.title + '</label><input type="checkbox" id="' + plugin.pl_name + '"></li>'
    }
    
    function add_ears_labels(labels_arr) {
        for (var i = 0; i < labels_arr.length; i++) {
            labels_arr[i].addEventListener('click', toggle_descr)
        }
    }
    
    function toggle_descr(e) {
        //fetch element to be displayed
        var target_name = e.target.getAttribute('for'),
            target = getme('#descr_' + target_name);
        
        //find which list it belongs to
        var descr_block = target.parentElement,
            siblings = descr_block.getElementsByTagName('p');
        
        //hide all descriptions
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = '';
        } 
        
        //display description for clicked language
        target.className += 'active';
    }
    
    function render_html() {
        for (section in library) {
            var cur_section = library[section],
                cur_section_name = section,
                ul_lang = dom_uls[section].lang,
                ul_opts = dom_uls[section].opts,
                descr_lang = dom_descr[section].lang;
            
            for (plugin in cur_section) {
                var cur_plugin = cur_section[plugin];
                if (cur_plugin.type == 'lang') {
                    ul_lang.innerHTML = ul_lang.innerHTML + build_lang_btn(cur_plugin, cur_section_name)
                    descr_lang.innerHTML = descr_lang.innerHTML + '<p id="descr_' + cur_plugin.pl_name + '">' + cur_plugin.descr + '</p>'
                } else {
//                    ul_opts.innerHTML = ul_opts.innerHTML + build_opts_card(cur_plugin)
                }
            }
            var sect_labels = ul_lang.getElementsByTagName('label');
            add_ears_labels(sect_labels);
        }
    }
    
    return {
        render: render_html
    }
})();

// init
plib.render() 