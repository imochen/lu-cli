import utils from '../utils';
import path from 'path';

let _createProj = ( projPath) => {
  let tarPath = ( dir ) => {
    return path.join( utils.runRoot , projPath , dir );
  }

  utils.copyFile({
    source : utils.cliPath('root/package.json'),
    target : tarPath('package.json')
  });

  utils.copyDir( utils.cliPath('root/src/') , tarPath('src/') );
  utils.copyDir( utils.cliPath('root/gulpfile.js/') , tarPath('gulpfile.js/') );

}

let create = ( projPath ) => {
  if( utils.isExists(projPath) && !utils.isEmptyDir(projPath)){
    utils.log.warn('`'+ projPath +'` is not an empty directory.');
  }else{
    utils.mkdir( projPath );
  }

  _createProj( projPath );

  utils.log.normal('\n  enter path:');
  utils.log.main('  $ cd ' + projPath + '\n');

  utils.log.normal('  install dependencies:');
  utils.log.main('  $ npm install\n');

  utils.log.normal('  run the app:');
  utils.log.main('  $ npm start\n');

}

export default { create }