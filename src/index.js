import path from 'path';
import fs from 'fs';
import program from 'commander';
import colors from 'colors';

import utils from './utils';
import project from './project';


let getVersion = () => {
  let _filePath = utils.cliPath('package.json');
  return JSON.parse(utils.readFile(_filePath)).version;
}

let displayVersion = () => {
  let version = getVersion();
  utils.log.main("\n" + version + "\n");
}

program.usage('[command] <options ...>');
program.option('-v, --version', 'output the version number', () => {
  displayVersion();
});
program.command('init <projectPath>').description('init a new project').action((projectPath) => {
  project.create( path.normalize(projectPath + '/') );
});

program.on('--help', () => {});
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}