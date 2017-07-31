
//load plugins
var 
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    filter = require('gulp-filter'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
	cleanCSS = require('gulp-clean-css')
    ;


//path config
var src = {
    sass: 'live/scss/',
},
dest = {
    css: 'live/css/',
};


// Task Helper
gulp.taskSet = function (name, fn, sets) {
	var setupTask = function (files, setName) {
		var taskName = name + '-' + setName;
		gulp.task(taskName, function () {
			return fn(files, setName);
		});
		return taskName;
	}

	var allTasks = [];
	for (var setName in sets) {
		allTasks.push(setupTask(sets[setName], setName));
	};
	gulp.task(name, allTasks, function () { });
}

gulp.taskSet('sass', function (files, setName) {
	var stream = gulp.src(files)
		.pipe(plumber({
            errorHandler: notify.onError({
                title: 'Error compiling SASS',
                message: 'Error: <%= error.message %>'
            })
        }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(autoprefixer('last 10 version'))
		.pipe(sourcemaps.write(dest.maps))
		.pipe(gulp.dest(dest.css))
		.pipe(filter(['**/*.css']))
		.pipe(livereload());
	return stream;
}, {
	site: src.sass + 'site.scss',
});



gulp.task('default', ['sass'], function() {
    livereload.listen();

    gulp.watch([
        src.sass + 'site.scss',
        src.sass + 'site/**/*.scss'
    ], ['sass-site']);


    gulp.watch('live/*.html').on('change', livereload.changed);
    gulp.watch('live/js/*.js').on('change', livereload.changed);
});