var gulp = require('gulp');
var minify = require('gulp-minify')

gulp.task('build', function () {
  gulp.src('isInViewport.jquery.js').pipe(minify({
    ext: {
      src: '.js',
      min: '.min.js',
    },
    exclude: ['tasks'],
    ignoreFiles: ['-min.js'],
  })).pipe(gulp.dest('dist'))
})