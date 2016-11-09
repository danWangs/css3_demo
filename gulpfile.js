// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var extender = require('gulp-html-extend')

// 检查js脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并,压缩js文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        //合并js文件
        .pipe(concat('all.js'))
        //给文件添加.min后缀
        .pipe(rename({ suffix: '.min' }))
        //压缩脚本文件
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 编译sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 编译less
gulp.task('sass', function() {
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

// 压缩css
gulp.task('style', function() {
    gulp.src('./css/*.css')
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/style'))
});
gulp.task('extend', function () {
    gulp.src('./dist/*.html')
        .pipe(extender({annotations:false,verbose:false})) // default options
        .pipe(gulp.dest('./preview/'));

})
// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts','style');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'scripts');
    });
    gulp.watch('./sass/*.scss', function(){
        gulp.run('sass');
    });
    gulp.watch('./less/*.less', function(){
        gulp.run('less');
    });
    gulp.watch('./css/*.css', function(){
        gulp.run('style');
    });
    gulp.task('watch', function () {
        gulp.watch(['/src/Views/*.html'], ['extend'])
    })
});
gulp.task('default',['extend']);