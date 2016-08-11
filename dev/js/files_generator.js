var build = (function() {
    function gulp_file(gulp_obj) {
        console.log(gulp_obj);
        //generate requires text
    }
    return {
        gulp: gulp_file
    };
})();

var input = (function() {
    var data = [],
        input_object = {};
    
    //listen to form submit button
    listen_to('#generate_btn', 'click', take_input);
    
    //collect submission data
    function take_input(e) {
        e.preventDefault();
        
        var inputs_raw = getme('input[name]:checked');
        
        if (inputs_raw) {
            if (inputs_raw.length) {
                for (i = 0; i < inputs_raw.length; i++) {
                    data.push(inputs_raw[i].id);
                }
            } else {
                data.push(inputs_raw.id);     //in case user only makes one selection (see getme function)
            }
        } else {
            console.log('nothing selected');
        }
        //TEMP DATA
        data = ["p_html_pug", "o_pug_pretty_\t", "p_css_sass", "o_sass_outputStyle_compressed", "p_js_typescript"];
        
        data.forEach(process_data);
        build.gulp(input_object);
    }
    
    function process_data(data_item) {
        var i_arr = data_item.split('_'),
            i_type = i_arr[0];
        
        if (i_type === 'p') {
            save_new_plugin(i_arr);             //add to input_object
        } else if (i_type === 'o'){
            save_plugin_option(i_arr);         //add to options of target 
        } else {
            console.log('unexpected input type');
        }
    }
    
    function save_new_plugin(params) {
        var name = params[2],
            target = params[1];
        
        input_object[name] = {
            name: name,
            target: target,
            options: []
        };
    }
    
    function save_plugin_option(params) {
        var target = params[1],
            name = params[2],
            value = params[3],
            option_object = {};
        
        option_object[name] = value;
        input_object[target].options.push(option_object);        
    }
})();