module.exports = {
  port : 13097, //serve端口
  path : {
    src : 'src', //源文件目录名字
    dev : 'dev', //开发临时目录
    release : 'release' //编译完的目录
  },
  html : {
    src : '/*.html', //html文件路径
    dest : '/' //html输出路径
  },
  css : {
    src : '/css/**/!(_)*.less',
    dest : '/css/'
  },
  js : {
    src : '/js/**/*.js',
    dest : '/js/'
  },
  img : {
    src : '/img/**/*.*',
    dest : '/img/'
  }
}