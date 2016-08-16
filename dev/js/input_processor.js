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
        //TESTING DATA
        data = ["l_html_pug", "o_pug_pretty_\t", "l_css_sass", "o_sass_outputStyle_compressed", "o_sass_sourceComments_true", "l_js_typescript", "x_css_cssnano"];
        
        data.forEach(process_data);
        
        console.log(input_object);
        build.gulp_file(input_object);
        npm_install(input_object);
    }

    function process_data(data_item) {
        var i_arr = data_item.split('_'),
            i_type = i_arr[0];
        
        switch(i_type) {
            case 'l':
                save_new_plugin(i_arr);             //add to input_object
                break;
            case 'o':
                save_plugin_option(i_arr);         //add to options of target object
                break;
            case 'x':
                console.log('got myself an x');
                break;
            default:
                console.log('unexpected input type');            
        }
    } 

    function save_new_plugin(params) {
        var black_list = ['html', 'php', 'css', 'javascript'],      //filter our native languages that don't require compiling
            target = params[1],                                     //TODO: filter those at earlier stage (e.g. special type in input_raw)
            name = params[2];
        if (black_list.indexOf(name) === -1) {
            input_object[name] = {
                name: name,
                target: target,
                options: []
            };
        } else {
//            console.log(name + ' is blacklisted');
        }
        
    }

    function save_plugin_option(params) {
        var target = params[1],
            name = params[2],
            value = params[3],
            option_object = {};

        option_object.name = name;
        option_object.value = value;
        input_object[target].options.push(option_object);        
    }
})();