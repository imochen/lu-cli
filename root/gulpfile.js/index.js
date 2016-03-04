var gulp = require('gulp'); //gulp
var less = require('gulp-less'); //less编译
var minifyCss = require('gulp-minify-css'); //css压缩
var autoprefixer = require('gulp-autoprefixer'); //自动补全前缀

var LessPluginFunctions = require('less-plugin-functions'); //less functions插件
functions = new LessPluginFunctions();

var uglify = require('gulp-uglify'); //js压缩

var htmlmin = require('gulp-htmlmin'); //html压缩

var rimraf = require('gulp-rimraf'); //清理目录

var livereload = require('gulp-livereload'); //实时刷新

var replace = require('gulp-replace'); //内容替换

var gulpSequence = require('gulp-sequence'); //队列执行

var path = require('path'); //path

var webserver = require('gulp-webserver'); //server

var myIP = require('my-ip');//获取本机内网IP

var gutil = require('gulp-util'); // gulp 工具

var config = require('./config'); //加载配置文件


var livereloadString = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script></head>";

var mode = 'dev';

var __src = function( dir ){
  return path.join( config.path.src , dir );
}

var __dest = function( dir ){
  return path.join( config.path[mode] , dir );
}

gulp.task('webserver',function(){
  gulp.src('./dev/')
    .pipe(webserver({
      host : myIP(),
      port : config.port,
      open : 'http://'+ myIP() +':'+config.port+ '/',
      fallback : 'index.html'
    }))
});

gulp.task('html',function(){
  gulp.src( __dest(config.html.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录
  return gulp.src( __src( config.html.src ) )
    .pipe( mode === 'dev' ? replace(/\<\/head\>/, livereloadString ) : gutil.noop() )
    .pipe( gulp.dest(__dest( config.html.dest)) )
    .pipe( mode === 'dev' ? livereload() : gutil.noop());
});

gulp.task('css',function(){
  gulp.src( __dest(config.css.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录
  return gulp.src( __src(config.css.src) )
    .pipe( less({ plugins : [functions]}))
    .on('error',function( err ){
      gutil.log('Less Error!', err.message );
      this.end();
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe( mode === 'dev' ? gutil.noop() : minifyCss() )
    .pipe( gulp.dest( __dest( config.css.dest) ) )
    .pipe( mode === 'dev' ? livereload() : gutil.noop() );
});

gulp.task('js',function(){
  gulp.src( __dest(config.js.src) , { read : false} ).pipe(rimraf({ force: true }));//清理目录
  return gulp.src( __src(config.js.src) )
    .pipe( mode === 'dev' ? gutil.noop() : uglify() )
    .pipe( gulp.dest( __dest( config.js.dest) ) )
    .pipe( mode === 'dev' ? livereload() : gutil.noop() );
});
gulp.task('img',function(){
  gulp.src( __dest(config.img.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录
  return gulp.src( __src( config.img.src))
    .pipe( gulp.dest(__dest( config.img.dest)))
    .pipe( mode === 'dev' ? livereload() : gutil.noop() );
 
});



gulp.task('watch-dev',['webserver'],function(){
  livereload.listen();
  gulp.watch( __src( config.html.src) ,['html'] );
  gulp.watch( __src( config.css.src) ,['css'] );
  gulp.watch( __src( config.js.src) ,['js'] );
  gulp.watch( __src( config.img.src) ,['img'] );
});

gulp.task('watch',function( cb ){
  gulpSequence('js','html','css','img','watch-dev',cb)
})

gulp.task('watch-css',function(){
  gulp.watch( __src( config.css.src) ,['css'] );
});

gulp.task('release',function( cb ){
  mode = 'release';
  gulpSequence('js','html','css','img',cb);
  
});