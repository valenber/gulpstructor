var dom_hand = (function() { 
    //Cache library
    var lib = {
        langs: plugins.fetch('type', 0),        //0 - languages
        xtras: plugins.fetch('type', 1)         //1 - optional processors
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
        },
        xtras_list: {
            html: getme('#html .xtras_list ul'),
            css: getme('#css .xtras_list ul'),
            js: getme('#js .xtras_list ul')
        }
    };
     
    //Display languages
    function add_lang_selectors() {
        var langs = lib.langs;            
        
        //append selectors        
        for (var i in langs) { 
            var category = langs[i].category;            
            dom.lang_list[category].innerHTML += generate.btn_selector(langs[i].name);
        }
        
        //add event listeners
        for (var j in langs) {            
            var selector_id = '#p_' + langs[j].name;
            listen_to(selector_id, 'change', display_lang_details);
        }
    }
    
    //Display Extras
    function add_xtras_selectors() {
        var xtras = lib.xtras;
        
        //append selectors
        for (var i in xtras) {
            
            var category = xtras[i].category;
            dom.xtras_list[category].innerHTML += generate.xtras_selector(xtras[i].name);
        }
        
        //add event listeners
    }
  
    //Events handlers
    function display_lang_details(e) {
        var pl_name = e.target.id.split('_')[1],
            plugin = plugins.get(pl_name),
            section_name = e.target.name.split('_')[0],
            section_descr = dom.lang_details[section_name].descr,
            section_opts = dom.lang_details[section_name].opts;
        
        //update DOM
        section_descr.innerHTML = generate.descripion(plugin.descr);    //display description
        
        //display plugin options if there are any, else clear the DOM element containing options        
        section_opts.innerHTML = generate.options_list(plugin.name);
    }
    
    //Initial render sequence
    function render_dom() {
        add_lang_selectors();
        add_xtras_selectors();
    }

    //init the app
    render_dom();    
})();