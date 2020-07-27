const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', () => {
   return gulp.src('src/sass/**/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('src/css'));
});

// gulp.task('html', () => {
//    return gulp.src('./index.html')
//       .pipe(browserSync.stream());
// })

gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./",
         port: 3000
      },
      notify: false
   });

   gulp.watch("./index.html").on('change', browserSync.reload);
   gulp.watch('./src/sass/**/*.sass', gulp.parallel('sass'));
   gulp.watch("./src/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'sass'));