var generate = (function() {
    //language selector
    function btn_selector(name) {
        var p = plugins.get(name),
            input_type = 'plugin',
            rad_name = p.category + '_' + input_type,
            rad_val = p.name,
            rad_id = p.category + '_' + p.name,
            lbl_for = rad_id,
            lbl_txt = p.title;
        
        return '<li>' +
                    '<input type="radio" name="' + rad_name + '" value="' + rad_val + '" id="' + rad_id + '" data-type="'+ input_type + '">' +
                    '<label for="' + lbl_for + '">' + lbl_txt + '</label>' +
                '</li>';
    }
    
    //language description
    function description(descr) {
        return '<p>' + descr + '</p>';
    }
    
    //plugin options list
    function options_list(plugin) {
        var list = '<h3>Options:</h3>',
            p = plugin,
            plugin_name = p.name,
            plugin_target = p.category,
            options_obj = p.options;
        
        for (var option in options_obj) {
            var option_values = options_obj[option],
                option_values_html = '';
            
            //text input for options with single value
            if (typeof(option_values) === 'string') {
                option_values_html = option_value_txt(plugin_name, option, option_values);
            } else {
                //radio buttons for each of the option's values
                for (var i in option_values) {
                    var new_radio = option_value_radio(plugin_name, plugin_target, option, option_values[i]);
                    option_values_html += new_radio;
                }
            }
            
            var list_item = '<li>'+ option_title(option) + option_values_html + '</li>';
            list += list_item;    
        }
        return list;        
    }
    
    function option_title(title) {
        return '<h4>' + title + '</h4>';
    }
    
    function option_value_radio(plugin_name, target, opt_title, opt_value) {
        var radio_name = plugin_name + '_' + opt_title,
            radio_value = opt_value,
            input_type = target === 'server' ? 'server' : 'option',
            radio_id = target + '_' + radio_name + '_' + opt_value,
            label_for = radio_id,
            label_text = opt_value;
        
        return  '<div>' + 
                    '<input type="radio" name="' + radio_name + '" value="' + opt_value + '" id="' + radio_id + '" data-type="'+ input_type + '">' +
                    '<label for="' + label_for + '">' + 
                        '<span class="opt_lbl_txt">' + label_text + '</span>' +
                    '</label>' +
                '</div>';
    }
    
    function option_value_txt(plugin_name, opton_name, def_value) {
        var input_name = plugin_name;
        var p = plugins.get(plugin_name),
            target = p.category,
            value = def_value,
            input_type = target === 'server' ? 'server' : 'plugin',
            id = target + '_' + plugin_name + '_' + opton_name;
            
        return  '<div>' +
            '<input type="text" value="' + value + '" id="' + id + '" data-type="'+ input_type + '">' +
                '</div>';
    }
    
    function xtras_selector(plugin) {
        var p = plugin,
            input_type = p.category === 'server' ? 'server' : 'plugin',
            checkbox_id = p.category + '_' + p.name,
            checkbox_name = checkbox_id,
            lbl_for = checkbox_id,
            title = p.title,
            opt_list = !empty_obj(p.options) ? '<ul class="opts">' + options_list(p) + '<ul>' : '';
        return '<li>'+
                    '<div class="plug_switch">' +
                        '<input type="checkbox" id="'+ checkbox_id +'" name="'+ checkbox_name + '" data-type="'+ input_type + '">' +
                        '<label class="main" for="'+ lbl_for + '">' + title + '</label>' +
                        '<label class="switch_btn" for="'+ lbl_for + '">' +
                            '<div class="pos pos_on">On</div>' +
                            '<div class="pos pos_off">Off</div>' +
                        '</label>' +
                        opt_list +
                    '</div>' +
                '</li>';
    }
    
    return {
        btn_selector: btn_selector,
        descripion: description,
        options_list: options_list,
        xtras_selector: xtras_selector
    };
})();