var gulp = require("gulp");
var replace = require("gulp-replace");
var uglify = require("gulp-uglify-es").default;
var pump = require("pump");

gulp.task("copy", function() {
  gulp.src(["src/*.json"]).pipe(gulp.dest("build"));
  gulp.src("src/assets/*.png").pipe(gulp.dest("build/assets"));
});


gulp.task("compress:js", function(cb) {
  pump([gulp.src("src/*.js"), uglify(), gulp.dest("build")], cb);
});

gulp.task("target:chrome", function() {
  gulp
    .src(["build/background.js"])
    .pipe(replace("browserName", "chrome"))
    .pipe(gulp.dest("build"));
});

gulp.task("build:chrome", ["copy", "compress:js", "target:chrome"]);
