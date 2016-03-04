'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createProj = function _createProj(projPath) {
  var tarPath = function tarPath(dir) {
    return _path2.default.join(_utils2.default.runRoot, projPath, dir);
  };

  _utils2.default.copyFile({
    source: _utils2.default.cliPath('root/package.json'),
    target: tarPath('package.json')
  });

  _utils2.default.copyDir(_utils2.default.cliPath('root/src/'), tarPath('src/'));
  _utils2.default.copyDir(_utils2.default.cliPath('root/gulpfile.js/'), tarPath('gulpfile.js/'));
};

var create = function create(projPath) {
  if (_utils2.default.isExists(projPath) && !_utils2.default.isEmptyDir(projPath)) {
    _utils2.default.log.warn('`' + projPath + '` is not an empty directory.');
  } else {
    _utils2.default.mkdir(projPath);
  }

  _createProj(projPath);

  _utils2.default.log.normal('\n  enter path:');
  _utils2.default.log.main('  $ cd ' + projPath + '\n');

  _utils2.default.log.normal('  install dependencies:');
  _utils2.default.log.main('  $ npm install\n');

  _utils2.default.log.normal('  run the app:');
  _utils2.default.log.main('  $ npm start\n');
};

exports.default = { create: create };