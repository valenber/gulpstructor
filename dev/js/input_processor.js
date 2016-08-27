var input_processor = (function() {
    
    //declare piping order accesible to both functions
    var piping_order;
    
    //collect submitted data
    function take_raw_input(e) {
        e.preventDefault();

        var raw_input = getme('input[name]:checked'),
            gulp_tasks_template = {
                server: {
                    use: null,
                    port: parseInt(getme('#server_connect_Port').value)
                },
                require: [],
                tasks: {}
            };
        //refresh piping order
        piping_order = plugins.get_order();

        //catch no input
        //TODO: Create proper error message
        if (raw_input === undefined) {
            return console.error('GulpStructor Err: No options were selected');     
        }

        //convert NodeList to Array
        var raw_input_arr = raw_input.length ? [].slice.call(raw_input) : [raw_input];

        //create gulpfile object
        var gulp_tasks = raw_input_arr.reduce(process_element, gulp_tasks_template);
        
        
        
        //if livereload is on, add livereload pipe to every task
        if(gulp_tasks.server.livereload == "true") {
            var reload_obj = {
                name: 'connect.reload'
            };
            for (var task in gulp_tasks.tasks) {
                gulp_tasks.tasks[task].push(reload_obj);
                
            }
        }
        
        //pass it to gulpfile builder
        build.gulp_file(gulp_tasks);

        //pass list of plugins to npm installer
        npm_install(gulp_tasks.require);
    }
    
    //MAIN input processor
    function process_element(obj, element) {
        var el_arr = element.id.split('_'),
            el_type = element.dataset.type;
        
        //if it's a plugin
        if (el_type === 'plugin') {              //assume there are no duplicate plugins
            var name = el_arr[1],
                target = el_arr[0],
                p = plugins.get(name, target),
                order = piping_order.indexOf(p.order);

            if (order !== 0) {         //exclude base Web Languages (HTML, CSS, JS)
                target = p.category;

                //if plugin is not saved to the require object yet
                if (obj.require.indexOf(name) === -1) {
                    //save to require list
                    obj.require.push(name);
                }

                //if plugin has specified methods (e.g. SourceMaps.init)
                if (p.methods) {
                    var methods = p.methods;

                    //TODO: add arguments to DOM as options
                    //place methods and arguments into an object
                    var plugin_methods_arr = methods.map(function(el) {
                        var el_arr = el.split('_'),
                            method = el_arr[0],
                            arg = el_arr[1] || '',
                            el_obj = {
                                name: method ? name + '.' + method : name,
                                argument: arg
                            };
                        return el_obj;
                    });
                    
                    //catch more than two methods
                    if (plugin_methods_arr.length > 2) {
                        console.error ('Gulpstructor Err: Currently can ONLY handle TWO METHODS per plugin');
                    }
                    
                    //if target is not defined set it to array
                    obj.tasks[target] = obj.tasks[target] || [];
                    
                    //save first method to the gulp_object
                    obj.tasks[target][order] = plugin_methods_arr[0];

                    //process second method
                    var method_obj = plugin_methods_arr[1];
                    if (piping_order.indexOf(method_obj.name) > 0) {
                        //save to new slot
                        order = piping_order.indexOf(method_obj.name);
                        obj.tasks[target][order] = method_obj;
                    } else {
                        //splice another slot into piping order
                        piping_order.splice(order + 1, 0, 'slot');
                        obj.tasks[target][order + 1] = method_obj;
                    }
                } else {
                    //save to tasks
                    var plugin_obj = {
                        name: name,
                        options: []
                    };
                    obj.tasks[target] = obj.tasks[target] || [];        //if not defined set to array
                    obj.tasks[target][order] = plugin_obj;
                }
            }       
        
        //if it's an option
        } else if (el_type === 'option') {
            var p_name = el_arr[1],
                p_target = el_arr[0],
                p_order = piping_order.indexOf(plugins.get(p_name).order),
                option_obj = {
                    name: el_arr[2],
                    value: el_arr[3]
                };
            //if gulp_tasks object has target plugin  
            if (obj.require.indexOf(p_name) !== -1) {
                //save to plugin options array
                obj.tasks[p_target][p_order].options.push(option_obj);
            }
            
        //if it's a server setup data
        } else if (el_type === 'server') {
            if (el_arr.length === 2) {      //it's a server plugin
                var s_name = el_arr[1];
                //add to require
                obj.require.push(s_name);
                //assign plugin to server.use
                obj.server.use = s_name;
            } else {                        //it's an option for the server plugin
                var o_name = el_arr[2].toLowerCase(),
                    value = el_arr[3];
                //pass options to server object
                obj.server[o_name] = value;
            }

            
        } else {
            console.error('Gulpstructor: Unknown type of input element');
        }
        
        return obj;
    }
    
    return {
        process: take_raw_input
    };
    
})();