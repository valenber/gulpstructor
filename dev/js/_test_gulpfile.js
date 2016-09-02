gulp.task('sass', function() {
    var post_processors = [a_prefix({browsers: ['> 1%']})];
    return gulp.src(path.sass)
        .pipe(maps.init())
        .pipe(sass({
        outputStyle: 'compressed'
    }))
        .on('error', swallowError)
        .pipe(postcss(post_processors))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.css))
        .pipe(livereload());
});

//process css
gulp.task('css', function() {
    return gulp.src(path.css.src)
        .pipe(sass(
        {outputStyle: 'compact',
         sourceComments: 'false'}
    ))
        .pipe(gulp.dest(path.css.trg));
});

//process css
gulp.task('css', function() {
    return gulp.src(path.css.src)
        .pipe(sass(
        {outputStyle: 'compact',
         sourceComments: 'false'}
    ))
        .pipe(gulp.dest(path.css.trg));
});