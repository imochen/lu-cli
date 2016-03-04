'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  log: {
    normal: function normal(str) {
      console.log(str);
    },
    debug: function debug(str) {
      console.log(_colors2.default.green(str));
    },
    info: function info(str) {
      console.log(_colors2.default.cyan(str));
    },
    warn: function warn(str) {
      console.log(_colors2.default.yellow(str));
    },
    error: function error(str) {
      console.log(_colors2.default.red(str));
    },
    main: function main(str) {
      console.log(_colors2.default.magenta(str));
    }
  },
  isExists: function isExists(src) {
    return _fs2.default.existsSync(src);
  },
  isDir: function isDir(src) {
    var stat = _fs2.default.lstatSync(src);
    return stat.isDirectory();
  },
  isEmptyDir: function isEmptyDir(src) {
    var _con = this.readDir(src);
    if (_con.length > 0) {
      return false;
    }
    return true;
  },
  isFile: function isFile(src) {
    var stat = _fs2.default.lstatSync(src);
    return stat.isFile();
  },
  readFile: function readFile(src) {
    return _fs2.default.readFileSync(src).toString();
  },
  readDir: function readDir(src) {
    return _fs2.default.readdirSync(src);
  },
  mkdir: function mkdir(tar) {
    _fs2.default.mkdirSync(tar);
  },
  delFile: function delFile(src) {
    if (this.isExists(src)) {
      _fs2.default.unlinkSync(src);
    }
  },
  writeFile: function writeFile(tar, data) {
    _fs2.default.writeFileSync(tar, data);
  },
  copyFile: function copyFile(config) {
    var conf = config || {};

    var src = conf.source;
    var tar = conf.target;
    var overwrite = conf.overwrite;
    var replace = conf.replace;
    var updateLog = conf.updateLog;

    if (!src || !this.isFile(src)) {
      return false;
    }

    var _src_file_data = this.readFile(src);

    if (replace && replace.length > 0) {
      replace.map(function (item) {
        var _con = item.split('->');
        var _regexp = new RegExp(_con[0], 'g');
        _src_file_data = _src_file_data.replace(_regexp, _con[1]);
      });
    }

    if (overwrite && this.isExists(tar)) {
      var _tar_file_data = this.readFile(tar);
      if (_tar_file_data !== _src_file_data) {
        this.delFile(tar);
        this.writeFile(tar, _src_file_data);
        updateLog && updateLog();
      }
    }

    if (!this.isExists(tar)) {
      this.writeFile(tar, _src_file_data);
    }
  },
  copyDir: function copyDir(src, tar) {
    var _this = this;

    if (this.isDir(src)) {
      if (!this.isExists(tar)) {
        this.mkdir(tar);
      }
      var _con = this.readDir(src);

      if (_con.length < 1) {
        return false;
      }

      _con.map(function (item) {
        if (item[0] === '.') {
          return false;
        }
        var _src_path = _path2.default.join(src, item);
        var _tar_path = _path2.default.join(tar, item);
        if (_this.isDir(_src_path)) {
          _this.copyDir(_src_path, _tar_path);
        }
        if (_this.isFile(_src_path)) {
          _this.copyFile({
            source: _src_path,
            target: _tar_path
          });
        }
      });
    }
  },
  toCamel: function toCamel(str) {
    var re = /-(\w)/g;
    return str.replace(re, function ($0, $1) {
      return $1.toUpperCase();
    });
  },

  cliRoot: _path2.default.dirname(__dirname),
  runRoot: process.cwd(),
  cliPath: function cliPath(dir) {
    return _path2.default.join(this.cliRoot, dir);
  },
  runPath: function runPath(dir) {
    return _path2.default.join(this.runRoot, dir);
  }
};