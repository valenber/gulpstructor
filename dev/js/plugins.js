//declare class
var Plugin = {
    create: function(type, title, options, pl_name) {
        var instance = Object.create(this);
        instance.type = type;
        instance.title = title;
        instance.options = options;
        instance.pl_name = pl_name || title.toLowerCase();
        return instance;
    }
};

//declare plugins
//STRUCTURE
var pl_pug = Plugin.create('lang', 'Pug/Jade', {pretty:['true', 'false', '\\t']}, 'pug');

//STYLE
var pl_sass = Plugin.create('lang', 'Sass', {outputStyle: ['nested', 'expanded', 'compact', 'compressed']}),
    pl_postcss = Plugin.create('opts', 'PostCSS', {});

//SCRIPT
var pl_concat = Plugin.create('opts', 'Concat',{});