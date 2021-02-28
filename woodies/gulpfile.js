const
   gulp                    = require('gulp'),
   sass                    = require('gulp-sass'),
   browserSync             = require('browser-sync'),
   uglify                  = require('gulp-uglify'),
   concat                  = require('gulp-concat'),
   rename                  = require('gulp-rename'),
   del                     = require('del'),
   imagemin                = require("gulp-imagemin"),
   autoprefixer            = require("gulp-autoprefixer"),
   removeComments          = require('gulp-strip-css-comments'),
   cssnano                 = require("gulp-cssnano"),
   cssbeautify             = require("gulp-cssbeautify")

gulp.task('clean', function () {
   return del('./dist')
})

gulp.task('sass', function () {
   return gulp.src('src/sass/**/*.sass')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer({
         browsers: ['last 8 versions']
      }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({ stream: true }))
})

gulp.task('css', function () {
   return gulp.src([
      'node_modules/aos/dist/aos.css',
      'node_modules/swiper/swiper.min.css',
      'node_modules/swiper/components/pagination/pagination.min.css',
      'node_modules/swiper/components/navigation/navigation.min.css'
   ])
      .pipe(concat('_libs.scss'))
      .pipe(gulp.dest('src/sass'))
      .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
   return gulp.src('src/*.html')
      .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function () {
   return gulp.src('src/js/*.js')
      .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
   return gulp.src([
      'node_modules/aos/dist/aos.js',
      'node_modules/swiper/swiper-bundle.min.js'
   ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/js'))
      .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', function () {
   browserSync.init({
      server: {
         baseDir: 'src/'
      }
   })
})

gulp.task('export', function () {
   const buildHtml = gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'))

   const buildCss = gulp.src('src/css/**/*.css')
      .pipe(autoprefixer({
            cascade: true
         }))
      .pipe(cssbeautify())
      .pipe(gulp.dest('dist/css'))
      .pipe(cssnano({
         zindex: false,
         discardComments: {
            removeAll: true
         }
      }))
      .pipe(removeComments())
      .pipe(gulp.dest('dist/css'))

   const buildJs = gulp.src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))

   const buildFonts = gulp.src('src/assets/fonts/**/*.*')
      .pipe(gulp.dest('dist/assets/fonts'))

   return gulp.src('src/assets/images/**/*.*')
      .pipe(imagemin([
         imagemin.gifsicle({interlaced: true}),
         imagemin.mozjpeg({quality: 95, progressive: true}),
         imagemin.optipng({optimizationLevel: 5}),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false }
            ]
         })
      ]))
      .pipe(gulp.dest('dist/assets/images'))
})

gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'))
   gulp.watch('src/*.html', gulp.parallel('html'))
   gulp.watch('src/js/*.js', gulp.parallel('script'))
})

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css', 'sass', 'js', 'browser-sync', 'watch'))


