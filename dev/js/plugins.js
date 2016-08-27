//Plugins library
var plugins = (function() {
    
    var library = [],
        piping_order = [        //order pipes by type of plugin
            'base',
            'linter',
            'sourcemaps.init',
            'compiler',
            'bundler',
            'post_processor',
            'optimizer',
            'sourcemaps.write',
            'livereload'
        ];
    
    var plugin_Class = {
        create: function(type, category, title, descr, options, order, methods, name) {
            var instance = Object.create(this),
                cat_options = ['html', 'css', 'js', 'server'];
            
            instance.type = type;       //0 - language, 1 - optional processor (e.g. CSSnano)
            instance.category = cat_options[category];
            instance.title = title;
            instance.descr = descr;
            instance.options = options;
            instance.order = order;
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
    
    function get_one(name, target) {
        return library.find(function(plugin) {
            if (!target) {
                return plugin.name === name;
            } else {
                return plugin.name === name && plugin.category === target;
            }
        });
    }
    
    function return_order() {
        return piping_order;
    }
    return {
        add: add_plugin,
        fetch: get_by_prop,
        get: get_one,
        get_order: return_order
    };
    
})();

//POPULATE PLUGINS LIBRARY
//Plugins Arguments: type, category, title, descr, options(object), name(optional)
//      Type: 0 - language, 1 - optional processor (e.g. CSSnano)
//      Category: 0 - structure, 1 - style, 2 - script

//STRUCTURE plugins
plugins.add(0, 0, 'HTML', 'A markup language used for structuring web-content.', {}, 'base');
plugins.add(0, 0, 'Pug/Jade', 'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.',
            { pretty: ['true', 'false', '\\t']},
            'compiler',
            null,
            'pug');
plugins.add(1, 3, 'WebServer', 'Creates a local server allowing you to preview the app or site you are building.', 
            {Port: '9000',
             LiveReload: ['true', 'false']},
            'server', ['server', 'reload'], 'connect');

//STYLE plugins
plugins.add(0, 1, 'CSS', 'The language used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.', {}, 'base');
plugins.add(0, 1, 'Sass', 'An extension of CSS that adds power and elegance to the basic language. It allows to use variables, nested rules, mixins, inline imports, and more.',
            {outputStyle: ['nested', 'expanded', 'compact', 'compressed'],
             sourceComments: ['true', 'false']},
            'compiler'
            );
plugins.add(1, 1, 'CSSnano', 'CSSnano description.', {}, 'optimizer');
plugins.add(1, 1, 'SourceMaps', 'Creates references to original style files, that make it easier to debug the resulting CSS.', {}, 'sourcemaps.init', ['init', 'write_"./"'], 'sourcemaps');

//SCRIPT plugins
plugins.add(0, 2, 'JavaScript', 'JavaScript Description.', {}, 'base');
plugins.add(0, 2, 'CoffeScript', 'CoffeScript Description.', {}, 'compiler');
plugins.add(0, 2, 'TypeScript', 'A strict superset of JavaScript that adds optional static typing and class-based object-oriented programming to the language.', {}, 'compiler');
plugins.add(1, 2, 'Concat', 'Concat Description.', {}, 'bundler');
plugins.add(1, 2, 'JShint', 'Catches errors and makes suggestion on improving your JavaScript code.', {}, 'linter', ['', 'reporter_default']);
plugins.add(1, 2, 'Uglify', 'Makes your JS code more compact to improve site performance.', 
            {mangle: ['true', 'false']},
            'optimizer');
plugins.add(1, 2, 'SourceMaps', 'Creates references to original script files, that make it easier to debug the resulting JavaScript.', {}, 'sourcemaps.init', ['init', 'write_"./"'], 'sourcemaps');