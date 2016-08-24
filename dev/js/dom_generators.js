var generate = (function() {
    //language selector
    function btn_selector(name) {
        var p = plugins.get(name),
            rad_name = p.category + '_lang',
            rad_val = p.name,
            rad_id = 'p_' + p.name,
            lbl_for = rad_id,
            lbl_txt = p.title;
        
        return '<li>' +
                    '<input type="radio" name="' + rad_name + '" value="' + rad_val + '" id="' + rad_id + '">' +
                    '<label for="' + lbl_for + '">' + lbl_txt + '</label>' +
                '</li>';
    }
    
    //language description
    function description(descr) {
        return '<p>' + descr + '</p>';
    }
    
    //plugin options list
    function options_list(plugin_name) {
        var list = '<h3>Options:</h3>',
            p = plugins.get(plugin_name),
            plugin_target = p.category,
            options_obj = p.options;
        
        for (var option in options_obj) {
            var option_values_arr = options_obj[option],
                option_values_html = '';
            
            //radio buttons for each of the option's values
            for (var i in option_values_arr) {
                var new_radio = option_value(plugin_name, plugin_target, option, option_values_arr[i]);
                option_values_html += new_radio;
            }
            
            var list_item = '<li>'+ option_title(option) + option_values_html + '</li>';
            list += list_item;    
        }
        return list;        
    }
    
    function option_title(title) {
        return '<h4>' + title + '</h4>';
    }
    
    function option_value(plugin_name, target, opt_title, opt_value) {
        var radio_name = plugin_name + '_' + opt_title,
            radio_value = opt_value,
            radio_id = 'o_' + target + '_' + radio_name + '_' + opt_value,
            label_for = radio_id,
            label_text = opt_value;
        
        return  '<div>' + 
                    '<input type="radio" name="' + radio_name + '" value="' + opt_value + '" id="' + radio_id + '">' +
                    '<label for="' + label_for + '">' + label_text + '</label>' +
                '</div>';
    }
    
    function xtras_selector(name) {
        var p = plugins.get(name),
            checkbox_id = 'p_' + p.name,
            checkbox_name = checkbox_id,
            lbl_for = checkbox_id,
            title = p.title,
            opt_list = !empty_obj(p.options) ? '<ul class="opts">' + options_list(name) + '<ul>' : '';
        return '<li>'+
                    '<div class="plug_switch">' +
                        '<input type="checkbox" id="'+ checkbox_id +'" name=""'+ checkbox_name + '>' +
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