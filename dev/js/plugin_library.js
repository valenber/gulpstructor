//Plugins library
var plugins = (function() {
    
    var library = [];
    
    var plugin_Class = {
        create: function(type, category, title, descr, options, order, methods, name) {
            var instance = Object.create(this),
                cat_options = ['html', 'css', 'js'],
                piping_order = [        //order pipes by type of plugin
                    'linter',
                    'maps_init',
                    'compiler',
                    'bundler',
                    'post_processor',
                    'optimizer',
                    'maps_write',
                    'livereload'
                ];
            
            instance.type = type;       //0 - language, 1 - optional processor (e.g. CSSnano)
            instance.category = cat_options[category];
            instance.title = title;
            instance.descr = descr;
            instance.options = options;
            instance.order = piping_order.indexOf(order);
            instance.methods = methods || null;
            instance.name = name || title.toLowerCase();    //only used for Pug/Jade
            return instance;
        }
    };
    
     
    
    function add_plugin() {
        var new_plugin = plugin_Class.create.apply(this, arguments);      //pass all aruments to plugin_Class.create function
        library.push(new_plugin);
    }
    
    function get_by_prop(prop, val) {
        return library.filter(function(plugin) {        //return matches of provided property value
            return plugin[prop] === val;
        });
    }
    
    function get_by_name(name) {
        return library.find(function(plugin) {
            return plugin.name === name;
        });
    }
    
    function return_order() {
        return piping_order;
    }
    return {
        add: add_plugin,
        fetch: get_by_prop,
        get: get_by_name,
        order: return_order
    };
    
})();

//POPULATE PLUGINS LIBRARY
//Plugins Arguments: type, category, title, descr, options(object), name(optional)
//      Type: 0 - language, 1 - optional processor (e.g. CSSnano)
//      Category: 0 - structure, 1 - style, 2 - script

//Structure plugins
plugins.add(0, 0, 'HTML', 'A markup language used for structuring web-content.', {}, null);
plugins.add(0, 0, 'PHP', 'A server-side scripting language.', {}, null);
plugins.add(0, 0, 'Pug/Jade', 'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.',
            { pretty: ['true', 'false', '\\t']},
            'compiler',
            null,
            'pug');
plugins.add(1, 0, 'LiveReload', 'Automatically updates your project in the browser. Requires plugin.', {}, 'livereload');

//Style plugins
plugins.add(0, 1, 'CSS', 'The language used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.', {}, null);
plugins.add(0, 1, 'Sass', 'An extension of CSS that adds power and elegance to the basic language. It allows to use variables, nested rules, mixins, inline imports, and more.',
            {outputStyle: ['nested', 'expanded', 'compact', 'compressed'],
             sourceComments: ['true', 'false']},
            'compiler'
            );
plugins.add(1, 1, 'CSSnano', 'CSSnano description.', {}, 'optimizer');
plugins.add(1, 1, 'SourceMaps', 'Creates references to original style files, that make it easier to debug the resulting CSS.', {}, 'maps', ['init', 'write'], 'csourcemaps');

//Script plugins
plugins.add(0, 2, 'JavaScript', 'JavaScript Description.', {}, null);
plugins.add(0, 2, 'CoffeScript', 'CoffeScript Description.', {}, 'compiler');
plugins.add(0, 2, 'TypeScript', 'A strict superset of JavaScript that adds optional static typing and class-based object-oriented programming to the language.', 
            {opt1: ['true', 'false'],
             opt2: ['foo', 'bar', 'baz']}, 
            'compiler');
plugins.add(1, 2, 'Concat', 'Concat Description.', {}, 'bundler');
plugins.add(1, 2, 'JShint', 'Catches errors and makes suggestion on improving your JavaScript code.', {}, 'linter', [null, 'reporter(stylish)']);
plugins.add(1, 2, 'Uglify', 'Makes your JS code more compact to improve site performance.', 
            {mangle: ['true', 'false'],
             opt2: ['foo', 'bar', 'baz']},
            'optimizer');
plugins.add(1, 2, 'SourceMaps', 'Creates references to original script files, that make it easier to debug the resulting JavaScript.', {}, 'maps', ['init', 'write'], 'jsourcemaps');