var generate = (function() {
    //language selector
    function btn_selector(category, name, title) {
        var radio_name = category + '_lang',
            radio_value = name,
            radio_id = 'p_' + category + '_' + name,
            label_for = radio_id,
            label_txt = title;
        return '<li>' +
                    '<input type="radio" name="' + radio_name + '" value="' + radio_value + '" id="' + radio_id + '" >' +
                    '<label for="' + label_for + '">' + label_txt + '</label>' +
                '</li>';
    }
    
    //language description
    function description(descr) {
        return '<p>' + descr + '</p>';
    }
    
    //plugin options list
    function options_list(plugin_name, options_obj) {
        var list = '<h3>Options:</h3>';
        
        for (var option in options_obj) {
            var option_values_arr = options_obj[option],
                option_values_html = '';
            
            //radio buttons for each of the option's values
            for (var i in option_values_arr) {
                var new_radio = option_value(plugin_name, option, option_values_arr[i]);
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
    
    function option_value(plugin_name, opt_title, opt_value) {
        var radio_name = plugin_name + '_' + opt_title,
            radio_value = opt_value,
            radio_id = 'o_' + radio_name + '_' + opt_value,
            label_for = radio_id,
            label_text = opt_value;
        
        return  '<div>' + 
                    '<input type="radio" name="' + radio_name + '" value="' + opt_value + '" id="' + radio_id + '">' +
                    '<label for="' + label_for + '">' + label_text + '</label>' + 
                '</div>';
    }
    
    return {
        btn_selector: btn_selector,
        descripion: description,
        options_list: options_list
    };
})();