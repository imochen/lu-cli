'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getVersion = function getVersion() {
  var _filePath = _utils2.default.cliPath('package.json');
  return JSON.parse(_utils2.default.readFile(_filePath)).version;
};

var displayVersion = function displayVersion() {
  var version = getVersion();
  _utils2.default.log.main("\n" + version + "\n");
};

_commander2.default.usage('[command] <options ...>');
_commander2.default.option('-v, --version', 'output the version number', function () {
  displayVersion();
});
_commander2.default.command('init <projectPath>').description('init a new project').action(function (projectPath) {
  _project2.default.create(_path2.default.normalize(projectPath + '/'));
});

_commander2.default.on('--help', function () {});
_commander2.default.parse(process.argv);
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}