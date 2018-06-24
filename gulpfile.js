var gulp = require("gulp");
var clean = require("gulp-clean");
var replace = require("gulp-replace");
var uglify = require("gulp-uglify-es").default;
var zip = require("gulp-zip");
var pump = require("pump");

gulp.task('clean', function () {
  return gulp.src('build', { read: false })
    .pipe(clean());
});

gulp.task("copy", function() {
  gulp.src(["src/*.json"]).pipe(gulp.dest("build"));
  gulp.src("src/assets/*.png").pipe(gulp.dest("build/assets"));
  gulp.src("src/twitch/*.css").pipe(gulp.dest("build/twitch"));
});

gulp.task("compress:js", function(cb) {
  pump([gulp.src("src/*.js"), uglify(), gulp.dest("build")]);
  pump([gulp.src("src/twitch/*.js"), uglify(), gulp.dest("build/twitch")], cb);
});

gulp.task("target:chrome", function() {
  gulp
    .src(["build/background.js"])
    .pipe(replace("browserName", "chrome"))
    .pipe(gulp.dest("build"));
});

gulp.task("package:chrome", function() {
  gulp
    .src("build/**")
    .pipe(zip("chromePackage.zip"))
    .pipe(gulp.dest("./"));
});

gulp.task("build:chrome", [
  "copy",
  "compress:js",
  "target:chrome",
  "package:chrome"
]);
