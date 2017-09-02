var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
 return gulp.src('dev-css/style.sass')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./assets/styles/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('dev-css/**/*.sass',['sass']);
});
