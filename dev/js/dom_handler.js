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
                opts: getme('#html .lang_details .opts')
            },
            css: {
                descr: getme('#css .lang_details .descr'),
                opts: getme('#css .lang_details .opts')
            },
            js: {
                descr: getme('#js .lang_details .descr'),
                opts: getme('#js .lang_details .opts')
            }
        }
    };
    
    //Display languages
    function add_lang_selectors() {
        var langs = lib.langs,
            lists = [dom.lang_list.html, dom.lang_list.css, dom.lang_list.js];
        
        //append selectors        
        for (var idx in langs) {           
            var cat = langs[idx].category;
            lists[cat].innerHTML = lists[cat].innerHTML + new_lang_selector(langs[idx]);            
        }
        
        //add event listeners
        for (var jdx in langs) {
            var selector_id = '#pl_' + langs[jdx].name;
            add_ears(selector_id, 'change', display_lang_details);
        }
    }
    
    //Generators of HTML elements    
    function new_lang_selector(plugin) {
        var section = null;
        if (plugin.category === 0) {
            section = 'html';
        } else if (plugin.category == 1) {
            section = 'css';
        } else {
            section = 'js';
        }
        
        return '<li>' +
            '<input type="radio" name="' + section + '_lang" value="' + plugin.name + '" id="pl_' + plugin.name + '" >' +
            '<label for="pl_' + plugin.name + '">' + plugin.title + '</label>' +
            '</li>';
    }
    
    function new_description(descr) {
        return '<p>' + descr + '</p>';
    }
    
    function new_option_list(opts_obj) {
        var prop_count = 0,
            opts_list_content = '';
        
        for (var prop in opts_obj) {
            prop_count += 1;
            var opt_name = prop[0].toUpperCase() + prop.slice(1),   //capitalize option key
                cur_li = '<li>' + opt_name + '</li>';
            opts_list_content = opts_list_content + cur_li;
            
        }
        return '<ul class="opts_list">' + opts_list_content + '</ul';
        
    }
    
    //Event listeners and handlers
    function add_ears(selector, event, handler) {
        var target = getme(selector);
        return target.addEventListener(event, handler || report_target);
    }
    
    function report_target(e){
        console.log(e.target.name + ' - ' + e.target.id);
    }
    
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
        
        section_descr.innerHTML = new_description(plugin.descr); 
        section_opts.innerHTML = new_option_list(plugin.options);
        
    }
    
    
    //Render
    function render_dom() {
        add_lang_selectors();
    }
    
    return {
        render: render_dom
    };
})();

dom_hand.render();