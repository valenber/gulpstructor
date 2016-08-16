//Plugins library
var plugins = (function() {
    
    var library = [];
    
    var plugin_Class = {
        create: function(type, category, title, descr, options, name) {
            var instance = Object.create(this);
            instance.type = type;               //0 - language, 1 - optional processor (e.g. CSSnano)
            instance.category = category;       //Categories: 0 - structure, 1 - style, 2 - script
            instance.title = title;
            instance.descr = descr;
            instance.options = options;
            instance.name = name || title.toLowerCase();       
            return instance;
        }
    };
    
    function add_plugin() {
        var new_plugin = plugin_Class.create.apply(this, arguments);        //passes all aruments to plugin_Class.create function
        library.push(new_plugin);
    }
    
    function get_by_prop(prop, val) {
        return library.filter(function(plugin) {        //return matches of provided property value
            return plugin[prop] === val;
        });
    }
    
    return {
        add: add_plugin,
        fetch: get_by_prop
    };
    
})();

//POPULATE PLUGINS LIBRARY
//Plugins Arguments: type, category, title, descr, options(object), name(optional)
//      Type: 0 - language, 1 - optional processor (e.g. CSSnano)
//      Category: 0 - structure, 1 - style, 2 - script

//Structure plugins
plugins.add(0, 0, 'HTML', 'A markup language used for structuring web-content.', {});
plugins.add(0, 0, 'PHP', 'A server-side scripting language.', {});
plugins.add(0, 0, 'Pug/Jade', 'Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.',
            { pretty: ['true', 'false', '\\t']},
            'pug');
plugins.add(1, 0, 'LiveReload', 'Automatically updates your project in the browser. Requires plugin.',{});

//Style plugins
plugins.add(0, 1, 'CSS', 'The language used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.', {});
plugins.add(0, 1, 'Sass', 'An extension of CSS that adds power and elegance to the basic language. It allows to use variables, nested rules, mixins, inline imports, and more.',
            {outputStyle: ['nested', 'expanded', 'compact', 'compressed'],
             sourceComments: ['true', 'false']}
            );
plugins.add(1, 1, 'CSSnano', 'CSSnano description.', {});
plugins.add(1, 1, 'SourceMaps', 'Creates references to original style files, that make it easier to debug the resulting CSS.', {});

//Script plugins
plugins.add(0, 2, 'JavaScript', 'JavaScript Description.', {});
plugins.add(0, 2, 'CoffeScript', 'CoffeScript Description.', {});
plugins.add(0, 2, 'TypeScript', 'TypeScript Description.', {});
plugins.add(1, 2, 'Concat', 'Concat Description.', {});
plugins.add(1, 2, 'JShint', 'Catches errors and makes suggestion on improving your JavaScript code.', {});
plugins.add(1, 2, 'Uglify', 'Makes your JS code more compact to improve site performance.', {});
plugins.add(1, 2, 'SourceMaps', 'Creates references to original script files, that make it easier to debug the resulting JavaScript.', {});