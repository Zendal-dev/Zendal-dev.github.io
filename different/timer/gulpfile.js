const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./",
         port: 3000
      },
      notify: false
   });

   gulp.watch('**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch'));