var dom_hand = (function() { 
    //Cache library
    var lib = {
        langs: plugins.get_langs(),
        opts: plugins.get_procs()
    };
    
    //Cache DOM
    var dom = {
        lang_list: {
            html: getme('#html .lang_list ul'),
            css: getme('#css .lang_list ul'),
            js: getme('#js .lang_list ul')
        },
        lang_details: {
            html: {
                descr: getme('#html .lang_details .descr'),
                opts: getme('#html .lang_details ul.opts')
            },
            css: {
                descr: getme('#css .lang_details .descr'),
                opts: getme('#css .lang_details ul.opts')
            },
            js: {
                descr: getme('#js .lang_details .descr'),
                opts: getme('#js .lang_details ul.opts')
            }
        }
    };
    
    //Display languages
    function add_lang_selectors() {
        var langs = lib.langs,
            lists = [dom.lang_list.html, dom.lang_list.css, dom.lang_list.js];
        
        //append selectors        
        for (var i in langs) {           
            var category = langs[i].category;           
            lists[category].innerHTML += generate.btn_selector(category, langs[i].name, langs[i].title);            
        }
        
        //add event listeners
        for (var j in langs) {
            var selector_id = '#pl_' + langs[j].name;
            add_ears(selector_id, 'change', display_lang_details);
        }
    }
    
    //Events handlers
    function display_lang_details(e) {
        var pl_name = e.target.id.split('_')[1],
            plugin = null,
            section_name = e.target.name.split('_')[0],
            section_descr = dom.lang_details[section_name].descr,
            section_opts = dom.lang_details[section_name].opts;
        
        //find target plugin
        for (var i in lib.langs) {
            if (lib.langs[i].name === pl_name) {
                plugin = lib.langs[i];
            }
        }
        
        //update DOM
        section_descr.innerHTML = generate.descripion(plugin.descr);                //display plugin description
        
        //display plugin options if there are any, else clear the DOM element containing options        
        if (!empty_obj(plugin.options)) {
            section_opts.innerHTML = generate.options_list(plugin.name, plugin.options);
        } else {
            section_opts.innerHTML = '';
        }
    }
    
    //Initial render
    function render_dom() {
        add_lang_selectors();
    }

    //init the app
    render_dom();
    
    return {
    };
    
})();