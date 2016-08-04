//Classes declarations
var Plugin = {
    create: function(type, title, descr, options, pl_name) {
        var instance = Object.create(this);
        instance.type = type;
        instance.title = title;
        instance.descr = descr;
        instance.options = options;
        instance.pl_name = pl_name || title.toLowerCase();
        return instance;
    }
};

//Plugins declarations
//STRUCTURE
var pl_pug = Plugin.create('lang', 'Pug/Jade', 'A terse language for writing HTML templates.', {pretty:['true', 'false', '\\t']}, 'pug'),
    pl_html = Plugin.create('lang', 'HTML', 'A markup language used for structuring web-content', {}),
    pl_php = Plugin.create('lang', 'PHP', 'A server-side scripting language', {});

//STYLE
var pl_sass = Plugin.create('lang', 'Sass', 'Sass Description', {outputStyle: ['nested', 'expanded', 'compact', 'compressed']}),
    pl_postcss = Plugin.create('opts', 'PostCSS', 'PostCSS Description', {}),
    pl_css = Plugin.create('lang', 'CSS', 'CSS Description', {});

//SCRIPT
var pl_concat = Plugin.create('opts', 'Concat', 'Concat Description', {}),
    pl_js = Plugin.create('lang', 'JavaScript', 'JavaScript Description', {}),
    pl_typescript = Plugin.create('lang', 'TypeScript', 'TypeScript Description', {});