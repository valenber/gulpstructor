//listen to form submit button
listen_to('#generate_btn', 'click', take_raw_input);

//collect submitted data
function take_raw_input(e) {
    e.preventDefault();
    
    var raw_input = getme('input[name]:checked'),
        gulp_tasks_template = {
            require: [],
            tasks: {}
        };
    
    if (raw_input === undefined) {
        return console.log('No options were selected');     //TODO: Create proper erorr message
    }
    
    //convert NodeList to Array
    var raw_input_arr = raw_input.length ? [].slice.call(raw_input) : [raw_input];
    
    //create gulpfile object
    var gulp_tasks = raw_input_arr.reduce(process_input_el, gulp_tasks_template);
    
    //pass it to gulpfile builder
    build.gulp_file(gulp_tasks);
    
    //pass data to npm installer
    npm_install(gulp_tasks.require);
    
}

function process_input_el(obj, element) {    
    var el_arr = element.id.split('_'),
        el_type = el_arr[0]; 
    
    if (el_type === 'p') {              //assume all plugins are unique
        var name = el_arr[1],
            p = plugins.get(name),
            order = p.order;
        
        if (order !== -1) {
            var target = p.category,
                plugin_obj = {
                    name: name,
                    options: []
                };
            if (p.methods) {
                plugin_obj.methods = p.methods;
            }

            //save to require list
            obj.require.push(name);

            //save to tasks
            obj.tasks[target] = obj.tasks[target] || [];        //if not defined set to array
            obj.tasks[target][order] = plugin_obj;
            
        } else {
//            console.log(name, 'doesn\'t requre compiling');
        }       

    } else if (el_type === 'o') {
        var p_name = el_arr[2],
            p_target = el_arr[1],
            p_order = plugins.get(p_name).order,
            option_obj = {
                name: el_arr[3],
                value: el_arr[4]
            };
        //if target plugin is already added to gulp tasks object
        if (obj.require.indexOf(p_name) !== -1) {
            //save to plugin options array
            obj.tasks[p_target][p_order].options.push(option_obj);
        }
        

    } else {
        console.log('Unknown element type');
    }

    return obj;
}